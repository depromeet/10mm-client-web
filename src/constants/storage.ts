export const STORAGE_KEY = {
  PROGRESS_MISSION: {
    MISSION: 'progress-mission-info',
    TIME: (missionId: string) => `progress-mission-${missionId}-time`,
    TIME_2: (missionId: string) => `progress-mission-${missionId}-time-2`,
  },
};
