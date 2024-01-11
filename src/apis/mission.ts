import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import apiInstance from './instance.api';

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

interface ModifyMissionRequest {
  missionId: number;
  name: string;
  content: string;
  visibility: MissionVisibility;
}

const MISSION_APIS = {
  createMission: (data: CreateMissionRequest) => {
    return apiInstance.post('/missions', {
      ...data,
    });
  },

  getMissions: async (params: GetMissionsParams): Promise<GetMissionsResponse> => {
    const { data } = await apiInstance.get('/missions', {
      params,
    });
    // TODO: data 객체 wrapper 삭제하기 (확인 필요)
    return data.data;
  },

  modifyMission:
    (missionId: number) =>
    async ({ data }: { data: ModifyMissionRequest }): Promise<ModifyMissionResponse> => {
      return apiInstance.put(`/missions/${missionId}`, {
        ...data,
      });
    },
};

export default MISSION_APIS;

export interface MissionContentType {
  missionId: string;
  name: string;
  content: string;
  category: MissionCategory;
  visibility: string;
  status: string;
  sort: number;
}

interface PageableType {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface GetMissionsResponse {
  content: MissionContentType[];
  first: boolean;
  last: boolean;
  pageable: PageableType;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

interface ModifyMissionResponse {
  missionId: string;
  name: string;
  content: string;
  category: MissionCategory;
  visibility: string;
}

const getMissionsIdQueryKey = (params: GetMissionsParams) => ['missions', ...Object.values(params)];

export const useGetMissions = (params: GetMissionsParams, option?: UseQueryOptions<GetMissionsResponse>) => {
  return useQuery<GetMissionsResponse>({
    queryKey: getMissionsIdQueryKey(params),
    queryFn: () => MISSION_APIS.getMissions(params),
    // queryFn: () => apiInstance.get('/missions', { params }), // 2번 방법
    ...option,
  });
};

export const useModifyMissionMutation = () => {
  // const router = useRouter();
  return useMutation({
    mutationFn: MISSION_APIS.modifyMission,
    onSuccess: () => {
      // router.push(ROUTER.HOME);
      console.log('뮤테이션 성공');
    },
    onError: () => {
      // TODO: error handling
    },
  });
};
