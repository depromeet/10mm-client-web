import { NATIVE_CUSTOM_EVENTS } from '@/constants/nativeCustomEvent';
import { isIOS, isWebView } from '@/utils/appEnv';

/** A 10MM mission is always ten minutes. */
export const MISSION_GOAL_SECONDS = 600;

export type MissionTimerStatus = 'running' | 'paused' | 'completed' | 'ended';

export type MissionTimerSnapshot = {
  missionId: string;
  missionName: string;
  status: MissionTimerStatus;
  elapsedSeconds: number;
};

type MissionTimerSyncDependencies = {
  isIOSWebView: () => boolean;
  now: () => number;
  postMessage: (message: string) => void;
};

const defaultDependencies: MissionTimerSyncDependencies = {
  // Live Activities are iOS only, so nothing is posted from a browser or Android.
  isIOSWebView: () => isWebView() && isIOS(),
  now: () => Date.now(),
  postMessage: (message) => window.ReactNativeWebView?.postMessage(message),
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * Posts one mission stopwatch snapshot to the native bridge. The native side
 * derives the countdown interval from `sentAt`, so the clock is injectable and
 * every send carries a fresh timestamp.
 */
export function sendMissionTimerSync(
  snapshot: MissionTimerSnapshot,
  dependencies: Partial<MissionTimerSyncDependencies> = {},
): void {
  const { isIOSWebView, now, postMessage } = { ...defaultDependencies, ...dependencies };

  if (!isIOSWebView()) {
    return;
  }

  const missionId = snapshot.missionId?.trim();
  const missionName = snapshot.missionName?.trim();

  if (!missionId || !missionName) {
    return;
  }

  const elapsedSeconds = Number.isFinite(snapshot.elapsedSeconds)
    ? clamp(Math.round(snapshot.elapsedSeconds), 0, MISSION_GOAL_SECONDS)
    : 0;

  postMessage(
    JSON.stringify({
      type: NATIVE_CUSTOM_EVENTS.MISSION_TIMER_SYNC,
      payload: {
        missionId,
        missionName,
        status: snapshot.status,
        elapsedSeconds,
        goalSeconds: MISSION_GOAL_SECONDS,
        sentAt: now(),
      },
    }),
  );
}
