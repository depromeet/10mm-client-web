export const STORAGE_KEY = {
  // TODO : 삭제
  STOPWATCH: {
    TIME: 'stopwatch-time', // 웹 이탈 시 체크
    TIME_2: 'stopwatch-time-2', // 테스트 용
    START_TIME: 'stopwatch-start-time',
    MISSION_ID: 'stopwatch-mission-id',
  },
  PROGRESS_MISSION: {
    MISSION: 'progress-mission-info',
    TIME: (missionId: string) => `progress-mission-${missionId}-time`,
    TIME_2: (missionId: string) => `progress-mission-${missionId}-time-2`,
  },
};
