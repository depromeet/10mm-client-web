import { MISSION_GOAL_SECONDS, sendMissionTimerSync } from './missionTimerNative';

const NOW = 1_721_700_000_000;

function setup(overrides: Partial<Parameters<typeof sendMissionTimerSync>[1]> = {}) {
  const postMessage = jest.fn();

  return {
    postMessage,
    dependencies: {
      isIOSWebView: () => true,
      now: () => NOW,
      postMessage,
      ...overrides,
    },
  };
}

function sentPayload(postMessage: jest.Mock, call = 0) {
  return JSON.parse(postMessage.mock.calls[call][0]);
}

describe('sendMissionTimerSync', () => {
  it('posts a running mission snapshot to the iOS WebView', () => {
    const { postMessage, dependencies } = setup();

    sendMissionTimerSync({ missionId: '42', missionName: '독서', status: 'running', elapsedSeconds: 0 }, dependencies);

    expect(sentPayload(postMessage)).toEqual({
      type: 'missionTimerSync',
      payload: {
        missionId: '42',
        missionName: '독서',
        status: 'running',
        elapsedSeconds: 0,
        goalSeconds: 600,
        sentAt: NOW,
      },
    });
  });

  it('posts a paused mission snapshot to the iOS WebView', () => {
    const { postMessage, dependencies } = setup();

    sendMissionTimerSync({ missionId: '42', missionName: '독서', status: 'paused', elapsedSeconds: 125 }, dependencies);

    expect(sentPayload(postMessage)).toEqual({
      type: 'missionTimerSync',
      payload: {
        missionId: '42',
        missionName: '독서',
        status: 'paused',
        elapsedSeconds: 125,
        goalSeconds: 600,
        sentAt: NOW,
      },
    });
  });

  it.each(['completed', 'ended'] as const)('posts a %s mission snapshot', (status) => {
    const { postMessage, dependencies } = setup();

    sendMissionTimerSync({ missionId: '42', missionName: '독서', status, elapsedSeconds: 600 }, dependencies);

    expect(sentPayload(postMessage).payload.status).toBe(status);
  });

  it('always reports the 10 minute goal', () => {
    const { postMessage, dependencies } = setup();

    sendMissionTimerSync({ missionId: '42', missionName: '독서', status: 'running', elapsedSeconds: 30 }, dependencies);

    expect(MISSION_GOAL_SECONDS).toBe(600);
    expect(sentPayload(postMessage).payload.goalSeconds).toBe(600);
  });

  it('clamps elapsed time into the goal range', () => {
    const { postMessage, dependencies } = setup();

    sendMissionTimerSync({ missionId: '42', missionName: '독서', status: 'running', elapsedSeconds: -5 }, dependencies);
    sendMissionTimerSync(
      { missionId: '42', missionName: '독서', status: 'running', elapsedSeconds: 900 },
      dependencies,
    );

    expect(sentPayload(postMessage, 0).payload.elapsedSeconds).toBe(0);
    expect(sentPayload(postMessage, 1).payload.elapsedSeconds).toBe(600);
  });

  it('rounds fractional elapsed seconds', () => {
    const { postMessage, dependencies } = setup();

    sendMissionTimerSync(
      { missionId: '42', missionName: '독서', status: 'running', elapsedSeconds: 12.6 },
      dependencies,
    );

    expect(sentPayload(postMessage).payload.elapsedSeconds).toBe(13);
  });

  it('takes sentAt from the injected clock', () => {
    const { postMessage, dependencies } = setup({ now: () => 1_000 });

    sendMissionTimerSync({ missionId: '42', missionName: '독서', status: 'running', elapsedSeconds: 0 }, dependencies);

    expect(sentPayload(postMessage).payload.sentAt).toBe(1_000);
  });

  it('does not send outside an iOS WebView', () => {
    const { postMessage, dependencies } = setup({ isIOSWebView: () => false });

    sendMissionTimerSync({ missionId: '42', missionName: '독서', status: 'running', elapsedSeconds: 0 }, dependencies);

    expect(postMessage).not.toHaveBeenCalled();
  });

  it.each([
    ['a missing mission id', { missionId: '', missionName: '독서' }],
    ['a blank mission id', { missionId: '   ', missionName: '독서' }],
    ['a missing mission name', { missionId: '42', missionName: '' }],
    ['a blank mission name', { missionId: '42', missionName: '   ' }],
  ])('does not send with %s', (_label, identity) => {
    const { postMessage, dependencies } = setup();

    sendMissionTimerSync({ ...identity, status: 'running', elapsedSeconds: 0 }, dependencies);

    expect(postMessage).not.toHaveBeenCalled();
  });
});
