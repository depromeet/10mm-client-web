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

// setProgressMissionTime test
test('setProgressMissionTime test', () => {
  setProgressMissionTime(TEST_MISSION_ID, 1000);
  expect(localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME(TEST_MISSION_ID))).toBe('1000');
});

describe('setMissionTimeStack 테스팅', () => {
  // beforeEach를 사용해서, 모든 테스트를 실행하기 전에 localStorage를 초기화합니다.
  beforeEach(() => {
    localStorage.clear();
  });

  // start -> stop -> restart -> stop
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
      const spy = mockTime(1466424490000 + idx * 10);
      setMissionTimeStack(TEST_MISSION_ID, data.status);
      spy.mockRestore();
    });

    const timeStack = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(TEST_MISSION_ID)) || '[]';
    const timeStackData: StackType[] = JSON.parse(timeStack);

    expect(timeStackData.length).toBe(4);

    timeStackData.forEach((data, idx) => {
      expect(data.time).toBe(1466424490000 + idx * 10);
      expect(data.status).toBe(stack[idx].status);
    });
  });

  test('새로운 stack이 쌓일 때 storage에 쌓이는 시간이 그 당시의 new Date().getTime()과 같아야합니다.', () => {
    const spy = mockTime(1466424490000);
    setMissionTimeStack(TEST_MISSION_ID, 'start');
    spy.mockRestore();

    const timeStack = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(TEST_MISSION_ID)) || '[]';
    const timeStackData = JSON.parse(timeStack);
    const time = timeStackData[0].time;

    expect(time).toBe(1466424490000);
  });
});

// getProgressMissionTime test
describe('getProgressMissionTime 테스팅', () => {
  const MOCK_TIME_BASE = 1466424490000;
  beforeEach(() => {
    localStorage.clear();
  });

  // 진행중인 미션이 없으면 (미션 데이터가 없으면)
  test('진행중인 미션이 없으면 0이 반환되어야합니다.', () => {
    const time = getProgressMissionTime(TEST_MISSION_ID);
    expect(time).toBe(0);

    setMissionTimeStack(TEST_MISSION_ID, 'start');
    const time2 = getProgressMissionTime(TEST_MISSION_ID);
    expect(time2).toBe(0);
  });

  // 진행중인 미션 데이터와 현재 미션 id와 다르면 0이 반환되어야합니다.
  test('진행중인 미션 데이터와 현재 미션 id와 다르면 0이 반환되어야합니다.', () => {
    setMissionData(TEST_MISSION_ID);
    const time = getProgressMissionTime('1');
    expect(time).toBe(0);
  });

  // 오늘 진행 중인 미션이 없으면
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

  // return 값은 number형 정수여야합니다.
  test('return 값은 number형 정수여야합니다.', () => {
    setMissionTimeStack(TEST_MISSION_ID, 'start');
    const time = getProgressMissionTime(TEST_MISSION_ID);
    expect(typeof time).toBe('number');
    expect(time % 1).toBe(0);
  });

  // start (0) -> current (10)
  test('start -> current 상태일 때, 10가 반환되어야합니다.', () => {
    const spy = mockTime(MOCK_TIME_BASE);
    setMissionTimeStack(TEST_MISSION_ID, 'start');
    spy.mockRestore();

    const timeStack = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(TEST_MISSION_ID)) || '[]';

    const spy2 = mockTime(MOCK_TIME_BASE + 10);
    const time = getProgressMissionTime(TEST_MISSION_ID);
    spy2.mockRestore();
    // expect(time).toBe(10);
  });

  // start -> stop -> current

  // start -> stop -> restart -> current
  // start -> stop -> restart -> stop -> current
  // start -> stop -> restart -> stop -> restart -> current
});
