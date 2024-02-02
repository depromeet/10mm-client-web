export const STORAGE_KEY = {
  PROGRESS_MISSION: {
    MISSION: 'progress-mission-info',
    TIME_STACK: (missionId: string) => `progress-mission-${missionId}-time-stack`,
    TIME: (missionId: string) => `progress-mission-${missionId}-time`,
    TIME_2: (missionId: string) => `progress-mission-${missionId}-time-2`,
  },
};
