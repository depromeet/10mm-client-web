import { StopwatchStep } from '@/hooks/mission/stopwatch/useStopwatchStatus';
import { act, renderHook } from '@testing-library/react';

import { MISSION_TIMER_GOAL_SECONDS, resolveMissionTimerStatus, useMissionTimerSync } from './missionTimerSync';

describe('resolveMissionTimerStatus', () => {
  it('reports running while the stopwatch is progressing', () => {
    expect(resolveMissionTimerStatus(StopwatchStep.progress, 30)).toBe('running');
  });

  it('reports paused while the stopwatch is stopped', () => {
    expect(resolveMissionTimerStatus(StopwatchStep.stop, 30)).toBe('paused');
  });

  it('sends nothing before the first start', () => {
    expect(resolveMissionTimerStatus(StopwatchStep.ready, 0)).toBeNull();
  });

  it('reports completed once the goal is reached', () => {
    expect(resolveMissionTimerStatus(StopwatchStep.progress, MISSION_TIMER_GOAL_SECONDS)).toBe('completed');
  });

  it('keeps reporting completed past the goal so no per-second updates are sent', () => {
    expect(resolveMissionTimerStatus(StopwatchStep.progress, 900)).toBe('completed');
    expect(resolveMissionTimerStatus(StopwatchStep.stop, 900)).toBe('completed');
  });
});

describe('useMissionTimerSync', () => {
  const MISSION = { missionId: '42', missionName: '독서' };

  function setup(initial: { step: StopwatchStep; second: number; isRestored?: boolean }) {
    const send = jest.fn();

    const view = renderHook(
      (props: { step: StopwatchStep; second: number; isRestored?: boolean }) =>
        useMissionTimerSync({
          ...MISSION,
          step: props.step,
          second: props.second,
          isRestored: props.isRestored ?? true,
          send,
        }),
      { initialProps: initial },
    );

    return { send, ...view };
  }

  function sentStatuses(send: jest.Mock) {
    return send.mock.calls.map(([snapshot]) => snapshot.status);
  }

  it('sends running at elapsed zero on the first start', () => {
    const { send, rerender } = setup({ step: StopwatchStep.ready, second: 0 });
    expect(send).not.toHaveBeenCalled();

    rerender({ step: StopwatchStep.progress, second: 0 });

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({
      ...MISSION,
      status: 'running',
      elapsedSeconds: 0,
    });
  });

  it('does not resend on every tick while running', () => {
    const { send, rerender } = setup({ step: StopwatchStep.progress, second: 0 });
    send.mockClear();

    rerender({ step: StopwatchStep.progress, second: 1 });
    rerender({ step: StopwatchStep.progress, second: 2 });

    expect(send).not.toHaveBeenCalled();
  });

  it('sends paused at the current elapsed time', () => {
    const { send, rerender } = setup({ step: StopwatchStep.progress, second: 0 });
    send.mockClear();

    rerender({ step: StopwatchStep.stop, second: 125 });

    expect(send).toHaveBeenCalledWith({ ...MISSION, status: 'paused', elapsedSeconds: 125 });
  });

  it('sends running with the unchanged elapsed time on resume', () => {
    const { send, rerender } = setup({ step: StopwatchStep.stop, second: 125 });
    send.mockClear();

    rerender({ step: StopwatchStep.progress, second: 125 });

    expect(send).toHaveBeenCalledWith({ ...MISSION, status: 'running', elapsedSeconds: 125 });
  });

  it('waits for storage restoration before sending anything', () => {
    const { send, rerender } = setup({
      step: StopwatchStep.progress,
      second: 0,
      isRestored: false,
    });

    expect(send).not.toHaveBeenCalled();

    rerender({ step: StopwatchStep.progress, second: 240, isRestored: true });

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ ...MISSION, status: 'running', elapsedSeconds: 240 });
  });

  it('sends a paused snapshot for a restored paused mission', () => {
    const { send, rerender } = setup({
      step: StopwatchStep.stop,
      second: 0,
      isRestored: false,
    });

    rerender({ step: StopwatchStep.stop, second: 240, isRestored: true });

    expect(send).toHaveBeenCalledWith({ ...MISSION, status: 'paused', elapsedSeconds: 240 });
  });

  it('sends completed exactly once at the goal', () => {
    const { send, rerender } = setup({ step: StopwatchStep.progress, second: 598 });
    send.mockClear();

    rerender({ step: StopwatchStep.progress, second: 599 });
    rerender({ step: StopwatchStep.progress, second: 600 });
    rerender({ step: StopwatchStep.progress, second: 601 });
    rerender({ step: StopwatchStep.progress, second: 700 });

    expect(sentStatuses(send)).toEqual(['completed']);
  });

  it('resends the current state when a resync is forced', () => {
    const { send, rerender, result } = setup({ step: StopwatchStep.progress, second: 30 });
    send.mockClear();

    act(() => {
      result.current.resync();
    });
    rerender({ step: StopwatchStep.progress, second: 30 });

    expect(send).toHaveBeenCalledWith({ ...MISSION, status: 'running', elapsedSeconds: 30 });
  });

  it('sends ended on demand', () => {
    const { send, result } = setup({ step: StopwatchStep.progress, second: 30 });
    send.mockClear();

    act(() => {
      result.current.endMissionTimer();
    });

    expect(send).toHaveBeenCalledWith({ ...MISSION, status: 'ended', elapsedSeconds: 30 });
  });

  it('does not send ended twice', () => {
    const { send, result } = setup({ step: StopwatchStep.progress, second: 30 });
    send.mockClear();

    act(() => {
      result.current.endMissionTimer();
      result.current.endMissionTimer();
    });

    expect(sentStatuses(send)).toEqual(['ended']);
  });

  it('does not send while the mission name is still loading', () => {
    const send = jest.fn();

    renderHook(() =>
      useMissionTimerSync({
        missionId: '42',
        missionName: '',
        step: StopwatchStep.progress,
        second: 30,
        isRestored: true,
        send,
      }),
    );

    expect(send).not.toHaveBeenCalled();
  });
});
