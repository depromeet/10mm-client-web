import { createQueryKeyFactory } from '@/apis/createQueryKeyFactory';
import { type MissionCategory, type MissionItemType, type MissionVisibility } from '@/apis/schema/mission';
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
  useSuspenseQuery,
} from '@tanstack/react-query';

import apiInstance from './instance.api';

interface CreateMissionRequest {
  name: string;
  content: string;
  category: MissionCategory;
  visibility: MissionVisibility;
}

type GetMissionsParams = {
  size: number;
  lastId?: number;
};

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
    const { data } = await apiInstance.get<GetMissionsResponse>('/missions', {
      params,
    });
    return data;
  },

  getMissionDetail: async (missionId: string): Promise<MissionContentType> => {
    const { data } = await apiInstance.get(`/missions/${missionId}`);
    return data;
  },

  modifyMission:
    (missionId: string) =>
    async (data: ModifyMissionRequest): Promise<ModifyMissionResponse> => {
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
  visibility: MissionVisibility;
  status: string;
  sort: number;
}

type GetMissionsResponse = MissionItemType[];

interface ModifyMissionResponse {
  missionId: string;
  name: string;
  content: string;
  category: MissionCategory;
  visibility: string;
}

const getMissionsIdQueryKey = createQueryKeyFactory<GetMissionsParams>('missions');

export const useGetMissions = (params: GetMissionsParams, option?: UseQueryOptions<GetMissionsResponse>) => {
  return useQuery<GetMissionsResponse>({
    queryKey: getMissionsIdQueryKey(params),
    queryFn: () => MISSION_APIS.getMissions(params),
    ...option,
  });
};

const getMissionDetailQueryKey = createQueryKeyFactory<{
  missionId: string;
}>('missionDetail');

export const useGetMissionDetail = (missionId: string, option?: UseQueryOptions<MissionContentType>) => {
  return useSuspenseQuery<MissionContentType>({
    queryKey: getMissionDetailQueryKey({ missionId }),
    queryFn: () => MISSION_APIS.getMissionDetail(missionId),

    ...option,
  });
};

export const useModifyMissionMutation = (
  missionId: string,
  option?: UseMutationOptions<ModifyMissionResponse, unknown, ModifyMissionRequest>,
) => {
  return useMutation({
    mutationFn: MISSION_APIS.modifyMission(missionId),
    ...option,
  });
};
