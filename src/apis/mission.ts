import { createQueryKeyFactory } from '@/apis/createQueryKeyFactory';
import { type MissionCategory, type MissionItemType, type MissionVisibility } from '@/apis/schema/mission';
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  useQueryClient,
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

  getMissions: async (): Promise<GetMissionsResponse> => {
    const { data } = await apiInstance.get<GetMissionsResponse>('/missions');
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

  deleteMission: (missionId: string) => {
    return apiInstance.delete(`/missions/${missionId}`);
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

const missionsQueryKey = ['missions'];

export const useGetMissions = (option?: UseQueryOptions<GetMissionsResponse>) => {
  return useQuery<GetMissionsResponse>({
    queryKey: missionsQueryKey,
    queryFn: MISSION_APIS.getMissions,
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

export const useDeleteMissionMutation = (missionId: string, option?: UseMutationOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => MISSION_APIS.deleteMission(missionId),
    onSuccess: async (...data) => {
      await queryClient.invalidateQueries({ queryKey: missionsQueryKey });
      option?.onSuccess?.(...data);
    },
    ...option,
  });
};
