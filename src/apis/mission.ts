import apiInstance, { BASE_URL } from './instance.api';

// 이부분은 emum으로 관리할지 type 으로 관리할지 고민입니다.
export enum MissionCategory {
  STUDY = 'STUDY',
  EXERCISE = 'EXERCISE',
  READING = 'READING',
  WRITING = 'WRITING',
  PROJECT = 'PROJECT',
  WATCHING = 'WATCHING',
  ETC = 'ETC',
}

export enum MissionVisibility {
  ALL = 'ALL',
  FOLLOWER = 'FOLLOWER',
  NONE = 'NONE',
}

interface CreateMissionRequest {
  name: string;
  content: string;
  category: MissionCategory;
  visibility: MissionVisibility;
}

interface GetMissionsParams {
  size: number;
  lastId?: number;
}

const MISSION_APIS = {
  createMission: (data: CreateMissionRequest) => {
    return apiInstance.post('/missions', {
      ...data,
    });
  },

  getMissions: async (params: GetMissionsParams) => {
    const { data } = await apiInstance.get('/missions', {
      params,
    });
    return data;
  },
};

export default MISSION_APIS;
