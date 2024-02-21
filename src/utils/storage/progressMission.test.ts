import { STORAGE_KEY } from '@/constants/storage';
import {
  getProgressMissionTime,
  setMissionData,
  setMissionTimeStack,
  setProgressMissionTime,
} from '@/utils/storage/progressMission';

const TEST_MISSION_ID = '0';

const mockTime = (time: number) => {
  const mockDate = new Date(time);
  const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  return spy;
};

test('setProgressMissionTime test', () => {
  setProgressMissionTime(TEST_MISSION_ID, 1000);
  expect(localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME(TEST_MISSION_ID))).toBe('1000');
});

describe('setMissionTimeStack 테스팅', () => {
  // beforeEach를 사용해서, 모든 테스트를 실행하기 전에 localStorage를 초기화합니다.
  beforeEach(() => {
    localStorage.clear();
  });

  test('start -> stop -> restart -> stop 상태가 time stack에 차례대로 쌓여야합니다.', () => {
    type StackType = {
      time: number;
      status: 'start' | 'stop' | 'restart';
    };
    const stack: StackType[] = [
      { time: 1, status: 'start' },
      { time: 2, status: 'stop' },
      { time: 3, status: 'restart' },
      { time: 4, status: 'stop' },
    ];

    stack.forEach((data, idx) => {
      const spy = mockTime(1708307992308 + idx * 10);
      setMissionTimeStack(TEST_MISSION_ID, data.status);
      spy.mockRestore();
    });

    const timeStack = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(TEST_MISSION_ID)) || '[]';
    const timeStackData: StackType[] = JSON.parse(timeStack);

    expect(timeStackData.length).toBe(4);

    timeStackData.forEach((data, idx) => {
      expect(data.time).toBe(1708307992308 + idx * 10);
      expect(data.status).toBe(stack[idx].status);
    });
  });

  test('새로운 stack이 쌓일 때 storage에 쌓이는 시간이 그 당시의 new Date().getTime()과 같아야합니다.', () => {
    const spy = mockTime(1708307992308);
    setMissionTimeStack(TEST_MISSION_ID, 'start');
    spy.mockRestore();

    const timeStack = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(TEST_MISSION_ID)) || '[]';
    const timeStackData = JSON.parse(timeStack);
    const time = timeStackData[0].time;

    expect(time).toBe(1708307992308);
  });
});

describe('getProgressMissionTime 테스팅', () => {
  const MOCK_TIME_BASE = 1708307992308;

  const startMission = (missionId: string) => {
    setMissionData(missionId);
    setMissionTimeStack(missionId, 'start');
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('진행중인 미션이 없으면 0이 반환되어야합니다.', () => {
    const time = getProgressMissionTime(TEST_MISSION_ID);
    expect(time).toBe(0);

    setMissionTimeStack(TEST_MISSION_ID, 'start');
    const time2 = getProgressMissionTime(TEST_MISSION_ID);
    expect(time2).toBe(0);
  });

  test('진행중인 미션 데이터와 현재 미션 id와 다르면 0이 반환되어야합니다.', () => {
    setMissionData(TEST_MISSION_ID);
    const time = getProgressMissionTime('1');
    expect(time).toBe(0);
  });

  test('오늘 진행 중인 미션이 없으면 0이 반환되어야합니다.', () => {
    // storage에 저장된 진행중인 미션이 전날의 미션이라면
    // 2024년 2월 20일 10시 10분 10초
    const spy = mockTime(1708307992308);
    setMissionData(TEST_MISSION_ID);
    setMissionTimeStack(TEST_MISSION_ID, 'start');
    spy.mockRestore();

    const missionData = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.MISSION);
    expect(missionData).not.toBe(null);

    const time2 = getProgressMissionTime(TEST_MISSION_ID);
    expect(time2).toBe(0);

    // 진행중이 미션이 전날의 미션이라면, 전날의 미션 데이터가 삭제되어야합니다.
    expect(localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.MISSION)).toBe(null);
  });

  test('return 값은 number형 정수여야합니다.', () => {
    setMissionTimeStack(TEST_MISSION_ID, 'start');
    const time = getProgressMissionTime(TEST_MISSION_ID);
    expect(typeof time).toBe('number');
    expect(time % 1).toBe(0);
  });

  const DEFAULT_MS = 1000;
  const timerMs = Number(process.env.NEXT_PUBLIC_TIMER_MS ?? DEFAULT_MS);

  test('start -> current 상태일 때, 10s가 반환되어야합니다.', () => {
    const spy = mockTime(MOCK_TIME_BASE);
    startMission(TEST_MISSION_ID);
    console.log('date: ', new Date());
    spy.mockRestore();

    const continueSeconds = 60;

    const spy2 = mockTime(MOCK_TIME_BASE + continueSeconds * timerMs);
    const time = getProgressMissionTime(TEST_MISSION_ID);
    spy2.mockRestore();
    expect(time).toBe(continueSeconds);
  });

  test('start(0) -> stop(60s) -> current(100s) 상태일 때, 60s가 반환되어야합니다.', () => {
    const spy = mockTime(MOCK_TIME_BASE);
    startMission(TEST_MISSION_ID);
    spy.mockRestore();

    const continueSeconds = 60;

    const spy2 = mockTime(MOCK_TIME_BASE + continueSeconds * timerMs);
    setMissionTimeStack(TEST_MISSION_ID, 'stop');
    spy2.mockRestore();

    const stopSeconds = 40;

    const spy3 = mockTime(MOCK_TIME_BASE + stopSeconds * timerMs);
    const time = getProgressMissionTime(TEST_MISSION_ID);
    spy3.mockRestore();

    expect(time).toBe(continueSeconds);
  });

  test('start(0) -> stop(60s) -> restart(100s) -> current(120s) 상태일 때, 80s가 반환되어야합니다.', () => {
    const spy = mockTime(MOCK_TIME_BASE);
    startMission(TEST_MISSION_ID);
    spy.mockRestore();

    const continueSeconds = 60;

    const spy2 = mockTime(MOCK_TIME_BASE + continueSeconds * timerMs);
    setMissionTimeStack(TEST_MISSION_ID, 'stop');
    spy2.mockRestore();

    const stopSeconds = 40;

    const spy3 = mockTime(MOCK_TIME_BASE + stopSeconds * timerMs);
    setMissionTimeStack(TEST_MISSION_ID, 'restart');
    spy3.mockRestore();

    const restartSeconds = 20;

    const spy4 = mockTime(MOCK_TIME_BASE + (stopSeconds + restartSeconds) * timerMs);
    const time = getProgressMissionTime(TEST_MISSION_ID);
    spy4.mockRestore();

    expect(time).toBe(continueSeconds + restartSeconds);
  });

  test('start(0) -> stop(60s) -> restart(100s) -> stop(120s) -> current(150s) 상태일 때, 90s가 반환되어야합니다.', () => {
    const spy = mockTime(MOCK_TIME_BASE);
    startMission(TEST_MISSION_ID);
    spy.mockRestore();

    const continueSeconds = 60;

    const spy2 = mockTime(MOCK_TIME_BASE + continueSeconds * timerMs);
    setMissionTimeStack(TEST_MISSION_ID, 'stop');
    spy2.mockRestore();

    const stopSeconds = 40;

    const spy3 = mockTime(MOCK_TIME_BASE + stopSeconds * timerMs);
    setMissionTimeStack(TEST_MISSION_ID, 'restart');
    spy3.mockRestore();

    const restartSeconds = 20;

    const spy4 = mockTime(MOCK_TIME_BASE + (stopSeconds + restartSeconds) * timerMs);
    setMissionTimeStack(TEST_MISSION_ID, 'stop');
    spy4.mockRestore();

    const stopSeconds2 = 30;

    const spy5 = mockTime(MOCK_TIME_BASE + (stopSeconds + restartSeconds + stopSeconds2) * timerMs);
    const time = getProgressMissionTime(TEST_MISSION_ID);
    spy5.mockRestore();

    expect(time).toBe(continueSeconds + restartSeconds);
  });

  test('start(0) -> stop(60s) -> restart(100s) -> stop(120s) -> restart(150s) -> current(200s) 상태일 때, 130s가 반환되어야합니다.', () => {
    const spy = mockTime(MOCK_TIME_BASE);
    startMission(TEST_MISSION_ID);
    spy.mockRestore();

    const continueSeconds = 60;

    const spy2 = mockTime(MOCK_TIME_BASE + continueSeconds * timerMs);
    setMissionTimeStack(TEST_MISSION_ID, 'stop');
    spy2.mockRestore();

    const stopSeconds = 40;

    const spy3 = mockTime(MOCK_TIME_BASE + stopSeconds * timerMs);
    setMissionTimeStack(TEST_MISSION_ID, 'restart');
    spy3.mockRestore();

    const restartSeconds = 20;

    const spy4 = mockTime(MOCK_TIME_BASE + (stopSeconds + restartSeconds) * timerMs);
    setMissionTimeStack(TEST_MISSION_ID, 'stop');
    spy4.mockRestore();

    const stopSeconds2 = 30;

    const spy5 = mockTime(MOCK_TIME_BASE + (stopSeconds + restartSeconds + stopSeconds2) * timerMs);
    setMissionTimeStack(TEST_MISSION_ID, 'restart');
    spy5.mockRestore();

    const restartSeconds2 = 50;

    const spy6 = mockTime(MOCK_TIME_BASE + (stopSeconds + restartSeconds + stopSeconds2 + restartSeconds2) * timerMs);
    const time = getProgressMissionTime(TEST_MISSION_ID);
    spy6.mockRestore();

    expect(time).toBe(continueSeconds + restartSeconds + restartSeconds2);
  });
});
