# 10MM Mission Timer Live Activity Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Start and synchronize a 10-minute iOS Live Activity from the embedded 10MM web mission stopwatch, including pause, resume, completion, termination, and app-relaunch recovery.

**Architecture:** The web sends idempotent mission timer snapshots through the existing WebView bridge. The React Native app validates each snapshot and upserts an ActivityKit activity keyed by mission ID. The private `react-native-live-activity` library gains an optional timer content model, active-activity discovery, and iOS stale-date support; the app supplies the 10MM-specific Widget Extension UI.

**Tech Stack:** Next.js 13, React 18, React Native 0.86.0 (the app branch is stacked on `upgrade/rn-086-api-36`), `react-native-webview`, TypeScript, Jest, Swift 5, ActivityKit, WidgetKit, SwiftUI, CocoaPods, Xcode.

---

## Repository Layout and Guardrails

Work in these repositories:

```text
/Users/logan/Repository/wooBottle/
├── personalProjects/10mm-client-web
├── personalProjects/10mm-client-app
└── externalProjects/react-native-live-activity
```

The library repository lives under `externalProjects/`, not `personalProjects/`.
If it is missing locally, clone it with the `woobottle` SSH identity:

```sh
GIT_SSH_COMMAND='ssh -i /Users/logan/.ssh/woo_bottle -o IdentitiesOnly=yes' \
  git clone git@github.com:woobottle/react-native-live-activity.git \
  /Users/logan/Repository/wooBottle/externalProjects/react-native-live-activity
```

### Node versions differ per repository

The two JavaScript repositories require different Node versions, so the
verification commands below cannot run in a single shell without switching:

| Repository | Node | Enforced by |
|---|---|---|
| `10mm-client-app` | v22.23.1 | `package.json` `engines.node >= 22.11.0` (React Native 0.86) |
| `10mm-client-web` | v24.19.0 | `.nvmrc` + `engines.node "24.x"` (Vercel dropped Node 18) |
| `react-native-live-activity` | v22.23.1 | no constraint; verified on 22 |

Running the app with Node 18 fails immediately with
`The engine "node" is incompatible with this module`. Switch with
`nvm use` inside each repository before running its commands.

The web repository ran on v18.17.1 until commit `f1a0ccf`. Vercel discontinued
Node 18, which failed deployments before the build started, so the runtime moved
to 24 and `react-lottie-player` had to be loaded through `next/dynamic` with SSR
off — on 22 and 24 alike, `lottie-web` touches `document` during module
evaluation and killed Next's page-data collection. Do not verify the web app on
18: it no longer matches what Vercel builds.

Before editing each repository:

1. Read any repository-local `AGENTS.md`.
2. Run `git status --short`.
3. Preserve unrelated changes.
4. Create a focused feature branch or worktree.
5. Do not add the four unrelated `.yarn/cache` files currently untracked in
   `10mm-client-web`.

Use test-first development for each behavior. Native target wiring that cannot
be meaningfully unit tested must be followed by a clean Xcode build and physical
device verification.

## Task 1: Extend the library TypeScript contract

**Repository:** `react-native-live-activity`

**Files:**

- Modify: `src/types.ts`
- Modify: `src/NativeLiveActivity.ts`
- Modify: `src/LiveActivity.ts`
- Modify: `src/index.ts`
- Test: `example/__tests__/LiveActivity.test.tsx`

### Step 1: Write failing public API tests

Add `getActiveActivities` to the mocked native module:

```ts
const native = {
  isSupported: jest.fn(),
  getPlatformCapabilities: jest.fn(),
  getActiveActivities: jest.fn(),
  startActivity: jest.fn(),
  updateActivity: jest.fn(),
  endActivity: jest.fn(),
};
```

Add tests that demonstrate the desired contract:

```ts
it('startActivity forwards timer content and referenceId', async () => {
  native.startActivity.mockResolvedValue({activityId: 'timer-1'});
  const content = {
    title: '독서',
    timer: {
      startAt: 1_721_700_000_000,
      endAt: 1_721_700_600_000,
      state: 'running',
    },
  };
  const options = {referenceId: 'mission-42'};

  await LiveActivity.startActivity(content, options);

  expect(native.startActivity).toHaveBeenCalledWith(content, options);
});

it('getActiveActivities returns native activity snapshots', async () => {
  const activities = [
    {
      activityId: 'timer-1',
      referenceId: 'mission-42',
      content: {title: '독서'},
    },
  ];
  native.getActiveActivities.mockResolvedValue(activities);

  await expect(LiveActivity.getActiveActivities()).resolves.toEqual(activities);
  expect(native.getActiveActivities).toHaveBeenCalledTimes(1);
});
```

### Step 2: Run the tests and verify RED

Run:

```sh
cd example
npm test -- --runInBand __tests__/LiveActivity.test.tsx
```

Expected: FAIL because `LiveActivity.getActiveActivities` does not exist.

### Step 3: Add the minimal public types

Add to `src/types.ts`:

```ts
export type LiveActivityTimerState = 'running' | 'paused' | 'completed'

export type LiveActivityTimer = {
  startAt: number
  endAt: number
  pauseAt?: number
  state: LiveActivityTimerState
}

export type LiveActivityContent = {
  title: string
  subtitle?: string
  progress?: number
  timer?: LiveActivityTimer
}

export type StartActivityOptions = {
  referenceId?: string
  android?: {
    foregroundService?: boolean
  }
}

export type ActiveLiveActivity = {
  activityId: string
  referenceId?: string
  content: LiveActivityContent
}
```

Extend `NativeLiveActivityModule`:

```ts
getActiveActivities(): Promise<ActiveLiveActivity[]>
```

Add the pass-through in `LiveActivity`:

```ts
getActiveActivities(): Promise<ActiveLiveActivity[]> {
  return NativeLiveActivity.getActiveActivities()
},
```

Export all new public types from `src/index.ts`, including
`StartActivityOptions`.

### Step 4: Run tests and type checking and verify GREEN

Run:

```sh
cd example
npm test -- --runInBand __tests__/LiveActivity.test.tsx
cd ..
npm run typecheck
```

Expected: PASS.

### Step 5: Commit

```sh
git add src example/__tests__/LiveActivity.test.tsx
git commit -m "feat: add timer activity contract"
```

## Task 2: Implement the library iOS timer state

**Repository:** `react-native-live-activity`

**Files:**

- Modify: `ios/LiveActivityAttributes.swift`
- Modify: `ios/LiveActivityModule.swift`
- Modify: `ios/LiveActivityModule.m`
- Modify: `example/ios/LiveActivityWidget/LiveActivityWidgetLiveActivity.swift`
- Modify: `example/App.tsx`
- Test: `example/__tests__/App.test.tsx`

### Step 1: Write a failing example lifecycle test

Mock `getActiveActivities` in `example/__tests__/App.test.tsx`, then add an
example-level test that starts timer content with a `referenceId`. If the
current test only performs a render smoke test, first expose fixed `testID`
values for the example buttons in the intended API and assert the native mock
receives timer content after pressing Start.

The required assertion is:

```ts
expect(mockStartActivity).toHaveBeenCalledWith(
  expect.objectContaining({
    timer: expect.objectContaining({
      state: 'running',
      startAt: expect.any(Number),
      endAt: expect.any(Number),
    }),
  }),
  {referenceId: 'example-timer'},
);
```

### Step 2: Run the test and verify RED

Run:

```sh
cd example
npm test -- --runInBand __tests__/App.test.tsx
```

Expected: FAIL because the example does not start timer content.

### Step 3: Extend `LiveActivityAttributes`

Use static attributes for reconnection:

```swift
@available(iOS 16.1, *)
public struct LiveActivityAttributes: ActivityAttributes {
  public struct ContentState: Codable, Hashable {
    public var title: String
    public var subtitle: String?
    public var progress: Double?
    public var timerStartAt: Date?
    public var timerEndAt: Date?
    public var timerPauseAt: Date?
    public var timerState: String?
  }

  public var referenceId: String?

  public init(referenceId: String? = nil) {
    self.referenceId = referenceId
  }
}
```

Keep the existing initializer semantics for title/subtitle/progress and add
optional timer parameters so existing consumers continue to compile.

### Step 4: Parse and validate timer content in Swift

In `LiveActivityModule.swift`, parse epoch milliseconds with:

```swift
private static func date(fromMilliseconds value: NSNumber?) -> Date? {
  guard let value else { return nil }
  return Date(timeIntervalSince1970: value.doubleValue / 1000)
}
```

Validation rules:

- `timer` must be a dictionary when present.
- `startAt` and `endAt` must be finite numbers.
- `endAt >= startAt`.
- `state` must be `running`, `paused`, or `completed`.
- `paused` requires `pauseAt`.
- `pauseAt` must lie within the timer interval.

Return `E_INVALID_CONTENT` for violations.

Create a helper that returns both state and stale date:

```swift
private struct ParsedActivityContent {
  let state: LiveActivityAttributes.ContentState
  let staleDate: Date?
}
```

Set `staleDate` only for a running timer.

### Step 5: Start and update with `referenceId` and `staleDate`

Read `referenceId` from options:

```swift
let referenceId = options["referenceId"] as? String
let attributes = LiveActivityAttributes(referenceId: referenceId)
```

On iOS 16.2 and newer, use `ActivityContent`:

```swift
let content = ActivityContent(
  state: parsed.state,
  staleDate: parsed.staleDate
)
let activity = try Activity<LiveActivityAttributes>.request(
  attributes: attributes,
  content: content,
  pushType: nil
)
```

Keep the existing `contentState` fallback on iOS 16.1. Apply the same split to
`updateActivity`.

### Step 6: Add active activity discovery

Add the Objective-C bridge declaration:

```objc
RCT_EXTERN_METHOD(getActiveActivities:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
```

Implement:

```swift
@objc func getActiveActivities(
  _ resolve: @escaping RCTPromiseResolveBlock,
  rejecter reject: @escaping RCTPromiseRejectBlock
) {
  guard #available(iOS 16.1, *) else {
    resolve([])
    return
  }

  resolve(Activity<LiveActivityAttributes>.activities.map(Self.serialize))
}
```

The serialized dictionary must contain `activityId`, optional `referenceId`,
and a content object matching the TypeScript shape. Convert dates back to epoch
milliseconds.

### Step 7: Update the example widget and app

Make the example app start a fixed 10-minute timer and demonstrate pause,
resume, completion, query, and end.

In the example Widget, centralize status rendering:

```swift
private var isCompleted: Bool {
  context.isStale || context.state.timerState == "completed"
}
```

For a timer:

```swift
Text(
  timerInterval: startAt...endAt,
  pauseTime: context.state.timerPauseAt,
  countsDown: true,
  showsHours: false
)
.monospacedDigit()
```

Render `10분 달성!` when completed.

### Step 8: Run tests and build the example

Run:

```sh
cd example
npm test -- --runInBand
cd ..
npm run typecheck
cd example/ios
bundle exec pod install
xcodebuild \
  -workspace LiveActivityExample.xcworkspace \
  -scheme LiveActivityExample \
  -sdk iphonesimulator \
  -configuration Debug \
  build
```

Expected: tests, type checking, pod installation, and simulator build PASS.

### Step 9: Commit

```sh
git add ios example src
git commit -m "feat(ios): support recoverable countdown activities"
```

## Task 3: Keep the library Android bridge compatible

**Repository:** `react-native-live-activity`

**Files:**

- Modify: `android/src/main/java/com/woobottle/liveactivity/LiveActivityModule.kt`
- Modify: `android/src/main/java/com/woobottle/liveactivity/LiveActivityForegroundService.kt`
- Test: add or extend the library's Android unit test location if available

### Step 1: Add a failing Android contract test

Add the smallest Robolectric or JVM unit test supported by the current Gradle
project that proves `getActiveActivities` resolves an array instead of producing
a missing-method bridge failure.

If the project has no runnable native unit-test harness, document that fact in
the commit and use the example Android compile as the executable contract test.
Do not add a new test framework solely for this iOS rollout.

### Step 2: Implement compatibility

Maintain an in-memory map containing activity ID, optional `referenceId`, and
the last content snapshot. Update it on start/update and remove it on end.

Add:

```kotlin
@ReactMethod
fun getActiveActivities(promise: Promise) {
  // Serialize the in-memory entries to a WritableNativeArray.
}
```

Timer UI parity and Android process-restart recovery remain out of scope. The
method must still exist because the shared TypeScript surface calls the same
native method name on both platforms.

### Step 3: Verify

Run:

```sh
cd example/android
./gradlew testDebugUnitTest assembleDebug
```

Expected: PASS.

### Step 4: Commit

```sh
git add android
git commit -m "feat(android): expose active activity snapshots"
```

## Task 4: Make the library commit consumable by the app

**Repository:** `react-native-live-activity`, then `10mm-client-app`

### Step 1: Verify the library branch

Run:

```sh
npm run typecheck
cd example
npm test -- --runInBand
git status --short
git log -3 --oneline
```

Expected: all verification passes and only intended commits exist.

### Step 2: Publish the private Git state

Push the feature branch only after explicit confirmation that remote publication
is desired:

```sh
GIT_SSH_COMMAND='ssh -i /Users/logan/.ssh/woo_bottle -o IdentitiesOnly=yes' \
  git push -u origin feat/mission-countdown
```

Record the immutable commit:

```sh
git rev-parse HEAD
```

### Step 3: Write the app dependency change

Modify `10mm-client-app/package.json` to pin the exact commit:

```json
"react-native-live-activity": "git+ssh://git@github.com/woobottle/react-native-live-activity.git#<verified-commit-sha>"
```

Do not use `main` or a mutable branch reference.

### Step 4: Install and verify autolinking

Run with the `woobottle` SSH identity available to Git:

```sh
yarn install
cd ios
bundle exec pod install
```

Verify:

```sh
rg -n "react-native-live-activity|LiveActivity" Podfile.lock Pods/Manifest.lock
```

Expected: the pod is present and sourced from `node_modules`.

### Step 5: Commit

```sh
git add package.json yarn.lock ios/Podfile.lock
git commit -m "build: add live activity library"
```

## Task 5: Build the React Native mission timer coordinator with tests

**Repository:** `10mm-client-app`

**Files:**

- Create: `src/liveActivity/missionTimer.types.ts`
- Create: `src/liveActivity/missionTimer.ts`
- Create: `src/liveActivity/missionTimer.test.ts`
- Modify: `constant.ts`
- Modify: `App.tsx`

### Step 1: Write failing validation and timing tests

Define the target payload:

```ts
export type MissionTimerSyncPayload = {
  missionId: string;
  missionName: string;
  status: 'running' | 'paused' | 'completed' | 'ended';
  elapsedSeconds: number;
  goalSeconds: number;
  sentAt: number;
};
```

Write tests for:

- malformed or missing fields return `null`;
- negative elapsed time clamps to zero;
- elapsed time over the goal clamps to the goal;
- running adds nonnegative transport delay;
- paused does not add transport delay;
- remaining time never exceeds the goal; and
- zero remaining maps to completed content.

Example:

```ts
it('does not consume paused time while a message is in transit', () => {
  const content = toLiveActivityContent(pausedPayload, 11_000);

  expect(content.timer).toEqual({
    startAt: 11_000,
    endAt: 611_000,
    pauseAt: 11_000,
    state: 'paused',
  });
});
```

### Step 2: Run the test and verify RED

Run:

```sh
yarn test src/liveActivity/missionTimer.test.ts --runInBand
```

Expected: FAIL because the coordinator helpers do not exist.

### Step 3: Implement pure payload helpers

Implement and export:

```ts
parseMissionTimerSyncPayload(value: unknown): MissionTimerSyncPayload | null
toLiveActivityContent(payload: MissionTimerSyncPayload, now: number): LiveActivityContent
```

Use `Number.isFinite`, trim IDs and names, clamp numeric values, and avoid
throwing for malformed WebView data.

### Step 4: Write failing coordinator tests

Inject a small client interface rather than mocking React Native globals:

```ts
type LiveActivityClient = Pick<
  typeof LiveActivity,
  | 'isSupported'
  | 'getActiveActivities'
  | 'startActivity'
  | 'updateActivity'
  | 'endActivity'
>;
```

Cover:

- unsupported capability is a no-op;
- running with no match starts one activity using `referenceId`;
- matching activity updates instead of duplicating;
- another mission's stale activity ends before starting;
- paused updates the matched activity;
- completed updates the matched activity;
- ended with no match succeeds;
- ended with a match ends it;
- update `E_NOT_FOUND` performs one query and one replacement start; and
- any native rejection resolves to a diagnostic result rather than throwing
  into WebView `onMessage`.

### Step 5: Run the test and verify RED

Run the same targeted Jest command. Expected: FAIL because the coordinator does
not exist.

### Step 6: Implement the coordinator

Export:

```ts
syncMissionTimerLiveActivity(
  payload: MissionTimerSyncPayload,
  dependencies?: {
    client: LiveActivityClient;
    now: () => number;
    platform: 'ios' | 'android';
  },
): Promise<MissionTimerSyncResult>
```

Return discriminated results such as:

```ts
type MissionTimerSyncResult =
  | {status: 'started' | 'updated' | 'ended'; activityId?: string}
  | {status: 'skipped'; reason: 'unsupported' | 'android' | 'invalid'}
  | {status: 'failed'; message: string};
```

### Step 7: Connect the WebView bridge

Add to `NATIVE_CUSTOM_EVENTS`:

```ts
MISSION_TIMER_SYNC: 'missionTimerSync',
```

In `App.tsx`, keep JSON parsing inside the existing `try` block and add:

```ts
case NATIVE_CUSTOM_EVENTS.MISSION_TIMER_SYNC: {
  const payload = parseMissionTimerSyncPayload(message.payload);
  if (!payload) {
    break;
  }
  await syncMissionTimerLiveActivity(payload);
  break;
}
```

Do not change login, haptic, vibration, FCM, or navigation cases.

### Step 8: Verify

Run:

```sh
yarn test --runInBand
yarn lint
```

Expected: PASS.

### Step 9: Commit

```sh
git add App.tsx constant.ts src/liveActivity
git commit -m "feat: coordinate mission live activities"
```

## Task 6: Add app relaunch and deep-link behavior

**Repository:** `10mm-client-app`

**Files:**

- Modify: `App.tsx`
- Modify: `ios/tenMinuteApp/Info.plist`
- Test: `src/liveActivity/missionTimer.test.ts`

### Step 1: Write failing reconnection tests

Add tests proving that:

- `getActiveActivities` is queried for every sync;
- a matching `referenceId` is reused after process-local state is empty; and
- an existing completed/stale Activity is updated rather than duplicated.

### Step 2: Verify RED

Run:

```sh
yarn test src/liveActivity/missionTimer.test.ts --runInBand
```

Expected: the new recovery assertion fails.

### Step 3: Implement recovery entirely from ActivityKit

Do not add AsyncStorage. Use `getActiveActivities()` as the recovery source.
Keep the coordinator free of module-level activity ID state.

### Step 4: Add the app URL scheme

Add a second entry under `CFBundleURLTypes`:

```xml
<dict>
  <key>CFBundleTypeRole</key>
  <string>Editor</string>
  <key>CFBundleURLName</key>
  <string>today.10mm.mission</string>
  <key>CFBundleURLSchemes</key>
  <array>
    <string>tenmm</string>
  </array>
</dict>
```

Handle initial and runtime URLs:

```ts
tenmm://mission/<missionId>/stopwatch
```

Convert the validated mission ID to:

```text
https://www.10mm.site/mission/<encodedMissionId>/stopwatch
```

Load it through the existing WebView ref. Ignore any unrecognized host or path.

### Step 5: Verify

Run tests and lint, then on the iOS Simulator run:

```sh
xcrun simctl openurl booted "tenmm://mission/42/stopwatch"
```

Expected: the app opens the matching WebView URL.

### Step 6: Commit

```sh
git add App.tsx ios/tenMinuteApp/Info.plist src/liveActivity
git commit -m "feat: restore live mission activity state"
```

## Task 7: Add the 10MM Widget Extension

**Repository:** `10mm-client-app`

**Files:**

- Create: `ios/TenMinuteLiveActivityWidget/Info.plist`
- Create: `ios/TenMinuteLiveActivityWidget/TenMinuteLiveActivityWidgetBundle.swift`
- Create: `ios/TenMinuteLiveActivityWidget/MissionTimerLiveActivity.swift`
- Modify: `ios/tenMinuteApp/Info.plist`
- Modify: `ios/tenMinuteApp.xcodeproj/project.pbxproj`
- Modify: `ios/tenMinuteApp.xcodeproj/xcshareddata/xcschemes/tenMinuteApp.xcscheme`

### Step 1: Establish the failing build

Add a temporary reference in the intended Widget Swift file to
`LiveActivityAttributes`, then run the app scheme build before adding the target.

Expected: the Widget target or shared attributes type is absent.

### Step 2: Add the Widget Extension target

Configure:

- product name: `TenMinuteLiveActivityWidgetExtension`;
- product type: `com.apple.product-type.app-extension`;
- deployment target: iOS 16.1;
- Swift version: 5.0 or newer;
- release bundle ID: `today.10mm.app.LiveActivityWidget`;
- debug bundle ID: `today.dev.second.10mm.app.LiveActivityWidget`;
- `APPLICATION_EXTENSION_API_ONLY = YES`; and
- embedding in the main app's `Embed Foundation Extensions` phase.

Add the exact library file at:

```text
../node_modules/react-native-live-activity/ios/LiveActivityAttributes.swift
```

to the Widget target's Compile Sources phase. Do not copy and independently
edit the attributes definition.

### Step 3: Enable Live Activities in the main app

Add:

```xml
<key>NSSupportsLiveActivities</key>
<true/>
```

to `ios/tenMinuteApp/Info.plist`.

The Widget `Info.plist` must contain the WidgetKit extension point:

```xml
<key>NSExtension</key>
<dict>
  <key>NSExtensionPointIdentifier</key>
  <string>com.apple.widgetkit-extension</string>
</dict>
```

### Step 4: Implement the 10MM Widget UI

Use one shared timer view across Lock Screen and Dynamic Island presentations.
The completion condition is:

```swift
context.isStale || context.state.timerState == "completed"
```

Use `Text(timerInterval:pauseTime:countsDown:showsHours:)` for running and
paused states. Apply `.monospacedDigit()` and accessibility labels.

Add:

```swift
.widgetURL(
  URL(string: "tenmm://mission/\(encodedReferenceId)/stopwatch")
)
```

Render all required Dynamic Island regions:

- expanded leading/trailing/center/bottom;
- compact leading/trailing; and
- minimal.

Keep the UI within Apple's Live Activity size constraints and use bundled
symbols or small assets only.

### Step 5: Build and inspect signing

Run:

```sh
cd ios
bundle exec pod install
xcodebuild \
  -workspace tenMinuteApp.xcworkspace \
  -scheme tenMinuteApp \
  -sdk iphonesimulator \
  -configuration Debug \
  build
```

Then inspect:

```sh
xcodebuild \
  -workspace tenMinuteApp.xcworkspace \
  -scheme tenMinuteApp \
  -showBuildSettings |
  rg "PRODUCT_BUNDLE_IDENTIFIER|IPHONEOS_DEPLOYMENT_TARGET|CODE_SIGN_ENTITLEMENTS"
```

Expected: the app and extension build successfully with their intended bundle
IDs and deployment targets.

### Step 6: Commit

```sh
git add ios
git commit -m "feat(ios): add mission timer live activity widget"
```

## Task 8: Add the web bridge serializer

**Repository:** `10mm-client-web`

**Files:**

- Modify: `src/constants/nativeCustomEvent.ts`
- Modify: `src/utils/nativeMethod.ts`
- Create: `src/utils/missionTimerNative.ts`
- Create: `src/utils/missionTimerNative.test.ts`

### Step 1: Write failing serializer tests

Cover:

- running, paused, completed, and ended messages;
- `goalSeconds` is always 600;
- elapsed time clamps to `0...600`;
- `sentAt` comes from an injected clock;
- message is sent only for an iOS WebView; and
- missing mission ID or name does not send.

Example:

```ts
it('posts a paused mission snapshot to the iOS WebView', () => {
  const postMessage = jest.fn();

  sendMissionTimerSync(
    {
      missionId: '42',
      missionName: '독서',
      status: 'paused',
      elapsedSeconds: 125,
    },
    {
      isIOSWebView: () => true,
      now: () => 1_721_700_000_000,
      postMessage,
    },
  );

  expect(JSON.parse(postMessage.mock.calls[0][0])).toEqual({
    type: 'missionTimerSync',
    payload: {
      missionId: '42',
      missionName: '독서',
      status: 'paused',
      elapsedSeconds: 125,
      goalSeconds: 600,
      sentAt: 1_721_700_000_000,
    },
  });
});
```

### Step 2: Run and verify RED

Run:

```sh
yarn test src/utils/missionTimerNative.test.ts --runInBand
```

Expected: FAIL because the serializer does not exist.

### Step 3: Implement the serializer

Add:

```ts
MISSION_TIMER_SYNC: 'missionTimerSync',
```

to the native event constant.

Implement `sendMissionTimerSync` with injectable defaults:

```ts
const isIOSWebView = () => isWebView() && isIOS();
const postMessage = (message: string) =>
  window.ReactNativeWebView?.postMessage(message);
```

Expose a `NATIVE_METHODS.MISSION_TIMER_SYNC` wrapper for stopwatch code.

### Step 4: Verify GREEN

Run the targeted test and:

```sh
yarn lint
```

Expected: PASS.

### Step 5: Commit

```sh
git add src/constants/nativeCustomEvent.ts src/utils
git commit -m "feat: add mission timer native bridge"
```

## Task 9: Synchronize the web stopwatch lifecycle

**Repository:** `10mm-client-web`

**Files:**

- Modify: `src/pages/mission/[id]/stopwatch/index.page.tsx`
- Modify: `src/pages/mission/[id]/stopwatch/Stopwatch.context.tsx`
- Modify: `src/pages/mission/[id]/stopwatch/ButtonSection.tsx`
- Modify: `src/pages/mission/[id]/stopwatch/Modal.context.tsx`
- Modify: `src/pages/mission/[id]/stopwatch/index.hooks.ts`
- Create: `src/pages/mission/[id]/stopwatch/missionTimerSync.test.tsx`

### Step 1: Write failing stopwatch lifecycle tests

Use fake timers and mock only the bridge boundary. Cover:

- first Start sends running at elapsed zero;
- Pause sends paused at current active elapsed time;
- Resume sends running with unchanged paused elapsed time;
- restored running state sends a running snapshot after initialization;
- restored paused state sends a paused snapshot;
- reaching 600 seconds sends completed once;
- opening a finish/leave confirmation does not send ended;
- cancelling a modal resends the restored running or paused state;
- confirmed exit sends ended;
- successful record submission sends ended before navigation; and
- failed record submission does not end the Live Activity.

### Step 2: Run and verify RED

Run:

```sh
yarn test \
  'src/pages/mission/[id]/stopwatch/missionTimerSync.test.tsx' \
  --runInBand
```

Expected: FAIL because the provider does not synchronize native state.

### Step 3: Put mission identity in the provider

Change:

```tsx
<StopwatchProvider missionId={missionId} missionName={missionName}>
```

The provider owns synchronization because it already has step and elapsed
state. Do not scatter serialization logic across visual components.

### Step 4: Synchronize stable state transitions

Inside the provider, derive:

```ts
const nativeStatus =
  second >= 600
    ? 'completed'
    : step === StopwatchStep.progress
      ? 'running'
      : step === StopwatchStep.stop
        ? 'paused'
        : null;
```

Send only after initial storage restoration has completed. Track the last
serialized state key in a ref to prevent duplicate messages from normal React
rerenders while still allowing visibility restoration to force a resync.

At 600 seconds, emit `completed` once. Continuing the web stopwatch past 600
must not send per-second Live Activity updates.

### Step 5: End only after irreversible user actions

On confirmed exit, send `ended` immediately before navigation and storage
removal.

On record submission, send `ended` in the mutation `onSuccess` callback before
removing storage and navigating. Do not send it when the user merely opens the
confirmation modal or when the API request fails.

### Step 6: Verify GREEN

Run:

```sh
yarn test \
  'src/pages/mission/[id]/stopwatch/missionTimerSync.test.tsx' \
  src/utils/missionTimerNative.test.ts \
  src/utils/storage/progressMission.test.ts \
  --runInBand
yarn lint
```

Expected: PASS.

### Step 7: Commit

```sh
git add 'src/pages/mission/[id]/stopwatch' src/utils src/constants
git commit -m "feat: sync stopwatch with live activity"
```

## Task 10: Cross-repository verification

**Repositories:** all three

### Step 1: Verify the library

The library root has no `test` script and its `android/` directory has no Gradle
wrapper — the Android module is built through the example app's project.

```sh
nvm use v22.23.1
cd /Users/logan/Repository/wooBottle/externalProjects/react-native-live-activity
npm install
npm run typecheck
cd example
npm install
npm test -- --runInBand
cd android
JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home \
ANDROID_HOME=$HOME/Library/Android/sdk \
  ./gradlew :react-native-live-activity:testDebugUnitTest \
            :react-native-live-activity:assembleDebug
```

Expected: typecheck PASS, example Jest PASS, Gradle BUILD SUCCESSFUL.

Note: `testDebugUnitTest` currently reports `NO-SOURCE` — the library has no
Kotlin unit tests. Treat this as a known gap, not a pass.

### Step 2: Verify the React Native app

Run:

```sh
nvm use v22.23.1
cd /Users/logan/Repository/wooBottle/personalProjects/10mm-client-app
yarn test --runInBand
yarn lint
cd ios
bundle exec pod install
xcodebuild \
  -workspace tenMinuteApp.xcworkspace \
  -scheme tenMinuteApp \
  -sdk iphonesimulator \
  -configuration Debug \
  -destination 'generic/platform=iOS Simulator' \
  build
```

Expected: `** BUILD SUCCEEDED **`, and the log must contain a
`ValidateEmbeddedBinary` step for
`tenMinuteApp.app/PlugIns/TenMinuteLiveActivityWidgetExtension.appex`. A build
that succeeds without that line means the Widget Extension was not embedded.

`pod install` must leave `ios/Podfile.lock` unchanged; a diff there means the
pinned library SHA and the committed lockfile disagree.

### Step 3: Verify the web app

Run:

```sh
nvm use v24.19.0
cd /Users/logan/Repository/wooBottle/personalProjects/10mm-client-web
yarn test --runInBand
yarn lint
yarn build
```

Expected: PASS. `yarn lint` emits pre-existing `react-hooks/exhaustive-deps`
warnings in unrelated files; no new warning may point at a mission timer file.

### Step 4: Check repository cleanliness

In each repository:

```sh
git diff --check
git status --short
git log -5 --oneline
```

Expected: no uncommitted feature changes and no unrelated files included in
the feature commits.

Known pre-existing noise in `10mm-client-web`, which must stay uncommitted:
`public/mockServiceWorker.js` and the `.yarn/cache` darwin-x64 → darwin-arm64
archive swap.

## Task 11: Physical iPhone acceptance test

> **PASSED — 2026-08-09**, against TestFlight build `2.0.5 (18)` with
> `@woobottle/react-native-live-activity@0.1.0`. Steps 1–3 passed on a Dynamic
> Island device. Step 4 (iOS 16.1) was not run for want of a device and Step 5's
> screenshots were not captured; neither blocks the feature.
>
> The run followed the merged checklist at
> `10mm-client-app/docs/plans/2026-08-09-device-verification.md`, which
> interleaves these steps with the library's own outstanding device items so one
> pass covers both. Per-item results are recorded there.
>
> Step 1 is now stale: the build under test came from TestFlight, not from
> running a Debug build out of Xcode.

**Device requirement:** iPhone on iOS 16.2 or newer with Live Activities enabled.

### Step 1: Install a Debug build on the device

Open `ios/tenMinuteApp.xcworkspace`, select the physical device, confirm signing
for both the app and Widget Extension, and run.

### Step 2: Verify the lifecycle

1. Enter a mission in the embedded web app.
2. Tap Start and confirm `10:00` on the Lock Screen or Dynamic Island.
3. Wait at least five seconds and confirm countdown progression.
4. Pause and verify the displayed time stays fixed for at least five seconds.
5. Resume and verify countdown continues from the paused value.
6. Force-quit the app and verify countdown continues.
7. Relaunch and verify no duplicate Live Activity appears.
8. Allow the countdown to reach zero and verify `미션 완료!` (`완료` in the
   compact Dynamic Island presentation). This plan originally said `10분 달성!`;
   that string moved out of the library when the app took ownership of the
   completion wording, and `MissionTimerLiveActivity.swift:125` renders the
   above instead. Following the old text would fail a passing build.
9. Return to the app and continue the web stopwatch beyond 10 minutes; verify
   the completion state remains.
10. Finish the mission and verify immediate dismissal.
11. Start again, choose to leave before 10 minutes, and verify dismissal only
    after confirmation.

### Step 3: Verify failure behavior

Disable Live Activities for 10MM in iOS Settings and repeat mission start,
pause, resume, and finish.

Expected: the web mission remains fully functional and no uncaught error or
blocking UI appears.

### Step 4: Verify iOS 16.1 compatibility when a device or simulator is available

Confirm:

- countdown reaches `00:00`;
- pause and resume remain correct; and
- returning to the app changes `00:00` to `10분 달성!` through the next web
  synchronization.

### Step 5: Record evidence

Capture:

- one Lock Screen screenshot;
- compact and expanded Dynamic Island screenshots where supported;
- test command output; and
- the exact library commit pinned by the app.

Do not declare the feature complete until automated checks and the physical
device lifecycle pass.
