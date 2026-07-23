# 10MM Mission Timer Live Activity Design

## Summary

When a user starts a mission in the 10MM web experience embedded in the iOS
app, the app starts a Live Activity that counts down from 10 minutes. The Live
Activity stays synchronized with the web stopwatch:

- starting a mission starts a `10:00` countdown;
- pausing the mission freezes the remaining time;
- resuming continues from the frozen remaining time;
- reaching 10 minutes changes the Live Activity to a persistent
  `10분 달성!` state;
- completing or explicitly leaving the mission ends the Live Activity; and
- relaunching the app reconnects the web mission to the existing Live Activity
  instead of creating a duplicate.

The feature spans three repositories:

- `10mm-client-web`: mission timer source of truth and WebView message producer;
- `10mm-client-app`: WebView bridge consumer and Live Activity coordinator; and
- `react-native-live-activity`: reusable native timer model and ActivityKit
  lifecycle implementation.

## Goals

- Display an accurate system-managed countdown while the React Native app is
  backgrounded or terminated.
- Keep pause, resume, completion, and termination behavior aligned with the web
  mission.
- Recover an existing Live Activity after an app process restart.
- Extend `react-native-live-activity` with a reusable timer model rather than
  implementing a second app-specific ActivityKit bridge.
- Keep Live Activity failures non-blocking for the web mission.

## Non-goals

- Starting or updating Live Activities remotely through APNs.
- Adding controls to the Live Activity itself.
- Replacing the existing web stopwatch implementation.
- Providing exact visual parity on Android.
- Supporting more than the one active mission already allowed by the web
  product.

## Considered Approaches

### Extend the library and synchronize through the existing WebView bridge

This is the selected approach. The library receives timer interval data and
renders it with SwiftUI's system timer. The web sends idempotent mission state
snapshots through the existing `ReactNativeWebView.postMessage` bridge.

Benefits:

- countdown rendering does not depend on a JavaScript interval;
- pause and resume use native timer semantics;
- app relaunch recovery can use ActivityKit's active activities collection; and
- the timer capability remains reusable by other library consumers.

Costs:

- requires coordinated changes in three repositories;
- the consuming app still needs its own Widget Extension UI; and
- the library's attributes schema must remain exactly aligned with the Widget
  Extension.

### Update the current title or subtitle once per second from JavaScript

This was rejected because JavaScript execution is suspended or throttled when
the app is backgrounded. It cannot guarantee an accurate lock-screen timer and
would generate unnecessary ActivityKit updates.

### Implement an app-specific ActivityKit module

This was rejected because it duplicates the lifecycle already implemented by
`react-native-live-activity` and does not satisfy the goal of improving and
using that library.

## Architecture

```text
10mm-client-web
  mission stopwatch state
        |
        | MISSION_TIMER_SYNC
        v
React Native WebView onMessage
  mission Live Activity coordinator
        |
        | start / update / query / end
        v
react-native-live-activity
  JS API -> Swift ActivityKit module
        |
        v
10mm-client-app Widget Extension
  Lock Screen + Dynamic Island
```

The web stopwatch remains the product-level source of truth. The app
coordinator converts each web state snapshot into a native Live Activity
operation. ActivityKit and SwiftUI become the display-time source of truth
between snapshots.

## WebView Message Contract

The web sends a complete state snapshot rather than an imperative command:

```ts
type MissionTimerSyncMessage = {
  type: 'MISSION_TIMER_SYNC';
  payload: {
    missionId: string;
    missionName: string;
    status: 'running' | 'paused' | 'completed' | 'ended';
    elapsedSeconds: number;
    goalSeconds: 600;
    sentAt: number;
  };
};
```

Properties:

- `missionId` is the idempotency and reconnection key.
- `missionName` is the Live Activity title.
- `status` describes the desired current state.
- `elapsedSeconds` is active mission time and excludes paused time.
- `goalSeconds` is explicitly sent to avoid embedding the 10-minute rule in
  the native bridge.
- `sentAt` is epoch milliseconds and allows the app to compensate for a
  delayed `running` message.

For a running snapshot, the app calculates:

```text
transportDelay = max(0, nativeNow - sentAt)
effectiveElapsed = elapsedSeconds + transportDelay
remaining = clamp(goalSeconds - effectiveElapsed, 0, goalSeconds)
endAt = nativeNow + remaining
```

For a paused snapshot, transport delay is not added because active time stopped
before the snapshot was sent.

The web emits snapshots:

- after the first successful start transition;
- after pause;
- after resume;
- when active elapsed time first reaches 600 seconds;
- after restored stopwatch state has been initialized on page load or WebView
  visibility recovery; and
- after mission submission succeeds or the user confirms that they are leaving
  the mission.

Opening a confirmation modal does not end the Live Activity. Cancellation
returns to the prior state and sends the corresponding synchronization
snapshot.

## Library API Extension

The existing content type gains an optional timer:

```ts
type LiveActivityTimerState = 'running' | 'paused' | 'completed';

type LiveActivityTimer = {
  startAt: number;
  endAt: number;
  pauseAt?: number;
  state: LiveActivityTimerState;
};

type LiveActivityContent = {
  title: string;
  subtitle?: string;
  progress?: number;
  timer?: LiveActivityTimer;
};
```

Timestamps are epoch milliseconds at the JavaScript boundary and are converted
to `Date` in Swift.

`StartActivityOptions` gains a cross-platform correlation key:

```ts
type StartActivityOptions = {
  referenceId?: string;
  android?: {
    foregroundService?: boolean;
  };
};
```

The key is stored in `LiveActivityAttributes` as static data. The library also
adds:

```ts
type ActiveLiveActivity = {
  activityId: string;
  referenceId?: string;
  content: LiveActivityContent;
};

LiveActivity.getActiveActivities(): Promise<ActiveLiveActivity[]>;
```

The app uses `referenceId = missionId`. This allows it to recover the correct
activity from `Activity<LiveActivityAttributes>.activities` after the React
Native process restarts.

The timer is optional so existing title/subtitle/progress consumers remain
compatible.

## iOS Activity State

`LiveActivityAttributes` stores `referenceId` as static data. Its
`ContentState` stores the existing fields plus optional timer interval fields:

- `timerStartAt: Date?`
- `timerEndAt: Date?`
- `timerPauseAt: Date?`
- `timerState: String?`

When starting or updating a running timer, the native module sets the
ActivityKit `staleDate` to `timerEndAt`. When that date passes,
`ActivityViewContext.isStale` changes and the Widget Extension renders
`10분 달성!` without requiring a JavaScript callback or APNs update.

When pausing, the native module:

- sets `timerPauseAt`;
- preserves an interval whose value at `timerPauseAt` equals the remaining
  duration; and
- clears `staleDate` so paused wall-clock time cannot complete the timer.

When resuming, the app sends a new running snapshot. The coordinator calculates
a new interval from the remaining active time, and the native module restores
`staleDate`.

When the web explicitly sends `completed`, the library stores the completed
state immediately. The Widget renders the same completion UI used for
`context.isStale`.

## Widget Extension

`10mm-client-app` adds a Widget Extension target with an iOS 16.1 deployment
target. The main app retains its current lower deployment target and guards
ActivityKit availability at runtime.

The app target adds:

```xml
<key>NSSupportsLiveActivities</key>
<true/>
```

The Widget target compiles the exact `LiveActivityAttributes.swift` definition
from the library. A diverging local attributes model is not allowed because
ActivityKit uses the matching type and state shape to connect the app request
to the Widget presentation.

Running and paused countdowns render with:

```swift
Text(
  timerInterval: startAt...endAt,
  pauseTime: pauseAt,
  countsDown: true,
  showsHours: false
)
```

The Lock Screen presentation includes:

- 10MM identity;
- mission name;
- large monospaced remaining time;
- a concise running or paused label; and
- completed styling with `10분 달성!`.

Dynamic Island presentations include:

- compact leading: 10MM symbol;
- compact trailing: remaining time or a completion checkmark;
- expanded: mission name, remaining time, and status; and
- minimal: 10MM symbol or completion checkmark.

The Widget applies a deep link to the active mission stopwatch so tapping the
Live Activity returns to the relevant WebView route.

## React Native Coordinator

The WebView message parser delegates `MISSION_TIMER_SYNC` to a small coordinator
outside the `App` render body. The coordinator:

1. validates the payload;
2. returns immediately on Android for the initial iOS-only rollout;
3. checks `LiveActivity.isSupported()`;
4. calls `getActiveActivities()` and matches `referenceId`;
5. ends stale activities associated with other missions because the product
   permits only one active mission;
6. starts, updates, or ends the matched activity; and
7. reports a non-blocking result event back to the web for diagnostics.

Repeated snapshots are safe. A running snapshot updates the existing activity
instead of starting another one.

No separate JavaScript persistence library is required. ActivityKit's active
activities collection is the recovery source after a process restart.

## Error Handling

- Unsupported iOS versions and disabled Live Activities are treated as a
  capability outcome, not a web mission error.
- Malformed WebView messages are ignored and logged without throwing from
  `onMessage`.
- Native start/update/end failures are caught by the app coordinator.
- `E_NOT_FOUND` during update triggers one recovery query; if no matching
  activity exists and the desired state is running or paused, the coordinator
  starts a replacement.
- `ended` is idempotent: no matching activity is considered success.
- Live Activity failures never block stopwatch state transitions, mission
  submission, or navigation.

## Testing

### react-native-live-activity

- TypeScript forwarding tests for timer content, `referenceId`, and
  `getActiveActivities`.
- Type checking for the public API.
- Native validation tests where practical for malformed timestamps, invalid
  intervals, and timer states.
- Example app lifecycle tests for start, pause, resume, complete, query, and
  end.

### 10mm-client-app

- Unit tests for payload validation and remaining-time calculation.
- Coordinator tests with a mocked library:
  - start with no existing activity;
  - update a matching activity;
  - avoid duplicate starts;
  - pause without adding transport delay;
  - resume using active elapsed time;
  - reconnect after process restart;
  - complete and end idempotently;
  - recover from `E_NOT_FOUND`; and
  - remain non-blocking when unsupported or rejected.
- Existing WebView login, vibration, and haptic messages continue to work.

### 10mm-client-web

- Serialization tests for each mission timer status.
- Tests that elapsed time is clamped and `goalSeconds` is 600.
- Tests that messages are only sent from the iOS WebView.
- Stopwatch integration tests for start, pause, resume, restored state,
  10-minute completion, confirmed exit, and successful submission.

### Manual iOS verification

Use a physical iPhone running iOS 16.1 or newer:

1. Start a mission and confirm `10:00`.
2. Lock the phone and confirm countdown progression.
3. Pause, wait at least five seconds, and confirm the display is frozen.
4. Resume and confirm countdown continues from the frozen value.
5. Force-quit the app and confirm the countdown continues.
6. Relaunch and confirm the existing activity is reused.
7. Reach zero and confirm `10분 달성!` remains visible.
8. Finish the web mission and confirm immediate dismissal.
9. Repeat with Live Activities disabled and confirm the web mission is
   unaffected.

## Delivery and Dependency Strategy

The app initially consumes the private library from its Git repository pinned
to a tested commit. Access uses the `woobottle` SSH identity. CI and other
developers need equivalent read access to the private repository.

After the integration is verified, the library can be tagged or published and
the app dependency can move from a commit pin to a version.

Each repository receives its own focused commit series. Generated dependency
artifacts and unrelated existing changes are excluded.

