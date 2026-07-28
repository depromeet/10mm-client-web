import { useCallback, useEffect, useRef, useState } from 'react';
import { StopwatchStep } from '@/hooks/mission/stopwatch/useStopwatchStatus';
import { MISSION_GOAL_SECONDS, type MissionTimerSnapshot } from '@/utils/missionTimerNative';
import { NATIVE_METHODS } from '@/utils/nativeMethod';

export const MISSION_TIMER_GOAL_SECONDS = MISSION_GOAL_SECONDS;

type SyncableStatus = 'running' | 'paused' | 'completed';

/**
 * The Live Activity only cares about stable states. `ready` has nothing to show
 * yet, and once the goal is reached the countdown is over - continuing the web
 * stopwatch past ten minutes must not turn into a per-second update stream.
 */
export function resolveMissionTimerStatus(step: StopwatchStep, second: number): SyncableStatus | null {
  if (step === StopwatchStep.ready) {
    return null;
  }

  if (second >= MISSION_TIMER_GOAL_SECONDS) {
    return 'completed';
  }

  if (step === StopwatchStep.progress) {
    return 'running';
  }

  if (step === StopwatchStep.stop) {
    return 'paused';
  }

  return null;
}

type UseMissionTimerSyncParams = {
  missionId: string;
  missionName: string;
  step: StopwatchStep;
  second: number;
  /** Storage restoration finished, so `second` is trustworthy. */
  isRestored: boolean;
  send?: (snapshot: MissionTimerSnapshot) => void;
};

/**
 * Mirrors the stopwatch onto the native Live Activity.
 *
 * Only state *transitions* are sent: the last serialized status is kept in a
 * ref so ordinary React rerenders (one per second while running) do not turn
 * into a message storm, while `resync` can still force a resend after the app
 * comes back to the foreground.
 */
export function useMissionTimerSync({
  missionId,
  missionName,
  step,
  second,
  isRestored,
  send = NATIVE_METHODS.MISSION_TIMER_SYNC,
}: UseMissionTimerSyncParams) {
  const lastSentStatusRef = useRef<SyncableStatus | null>(null);
  const hasEndedRef = useRef(false);
  const [resyncToken, setResyncToken] = useState(0);

  // Read through refs so the effect below stays keyed on the transition, not on
  // the per-second `second` value.
  const secondRef = useRef(second);
  secondRef.current = second;
  const sendRef = useRef(send);
  sendRef.current = send;

  const canSend = Boolean(missionId?.trim()) && Boolean(missionName?.trim()) && isRestored;

  useEffect(() => {
    if (!canSend || hasEndedRef.current) {
      return;
    }

    const status = resolveMissionTimerStatus(step, secondRef.current);
    if (!status || status === lastSentStatusRef.current) {
      return;
    }

    lastSentStatusRef.current = status;
    sendRef.current({
      missionId,
      missionName,
      status,
      elapsedSeconds: secondRef.current,
    });
  }, [canSend, missionId, missionName, step, second, resyncToken]);

  /** Force the next render to resend the current state (e.g. after visibility restore). */
  const resync = useCallback(() => {
    lastSentStatusRef.current = null;
    setResyncToken((token) => token + 1);
  }, []);

  /**
   * Tear the Live Activity down. Only call this after an irreversible user
   * action - opening a confirmation modal must not end it.
   */
  const endMissionTimer = useCallback(() => {
    if (hasEndedRef.current || !missionId?.trim() || !missionName?.trim()) {
      return;
    }

    hasEndedRef.current = true;
    lastSentStatusRef.current = null;
    sendRef.current({
      missionId,
      missionName,
      status: 'ended',
      elapsedSeconds: secondRef.current,
    });
  }, [missionId, missionName]);

  return { resync, endMissionTimer };
}
