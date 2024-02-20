import { STORAGE_KEY } from '@/constants/storage';
import { setMissionTimeStack, setProgressMissionTime } from '@/utils/storage/progressMission';

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

});
