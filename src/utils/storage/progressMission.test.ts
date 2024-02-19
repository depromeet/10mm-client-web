import { STORAGE_KEY } from '@/constants/storage';
import { setMissionTimeStack, setProgressMissionTime } from '@/utils/storage/progressMission';

const TEST_MISSION_ID = '0';
test('1 is 1', () => {
  expect(1).toBe(1);
});

// setProgressMissionTime test
test('setProgressMissionTime test', () => {
  setProgressMissionTime(TEST_MISSION_ID, 1000);
  expect(localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME(TEST_MISSION_ID))).toBe('1000');
});

// setMissionTimeStack
test('setMissionTimeStack test', () => {
  const time = new Date().getTime();
  const timeInfo = { time, status: 'start' };

  setMissionTimeStack(TEST_MISSION_ID, 'start');
  expect(localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(TEST_MISSION_ID))).toBe(
    JSON.stringify([timeInfo]),
  );
});

describe('root', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // start -> stop -> restart -> stop
  test('setMissionTimeStack test', () => {
    setMissionTimeStack(TEST_MISSION_ID, 'start');
    setMissionTimeStack(TEST_MISSION_ID, 'stop');
    setMissionTimeStack(TEST_MISSION_ID, 'restart');
    setMissionTimeStack(TEST_MISSION_ID, 'stop');

    const timeStack = localStorage.getItem(STORAGE_KEY.PROGRESS_MISSION.TIME_STACK(TEST_MISSION_ID)) || '[]';
    const timeStackData = JSON.parse(timeStack);
    console.log('timeStackData: ', timeStackData);

    expect(timeStackData.length).toBe(4);
    expect(timeStackData[0].status).toEqual('start');
  });
});
