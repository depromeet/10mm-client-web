import getQueryKey from '@/apis/getQueryKey';
import { type MissionCategory, type MissionItemTypeWithRecordId, type MissionVisibility } from '@/apis/schema/mission';
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
  getFollowMissions: async (followId: number): Promise<GetFollowMissionsResponse> => {
    const { data } = await apiInstance.get(`/missions/follow/${followId}`);
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
  getMissionSummery: async (): Promise<GetMissionSummeryResponse> => {
    const { data } = await apiInstance.get(`/missions/summary`);
    return data;
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

type GetMissionsResponse = MissionItemTypeWithRecordId[];

type GetFollowMissionsResponse = {
  symbolStack: number;
  followMissions: MissionItemTypeWithRecordId[];
};

interface ModifyMissionResponse {
  missionId: string;
  name: string;
  content: string;
  category: MissionCategory;
  visibility: string;
}

export const useGetMissions = (option?: UseQueryOptions<GetMissionsResponse>) => {
  return useQuery<GetMissionsResponse>({
    queryKey: getQueryKey('missions'),
    queryFn: MISSION_APIS.getMissions,
    ...option,
  });
};

export const useGetMissionDetail = (missionId: string, option?: UseQueryOptions<MissionContentType>) => {
  return useSuspenseQuery<MissionContentType>({
    queryKey: getQueryKey('missionDetail', { missionId }),
    queryFn: () => MISSION_APIS.getMissionDetail(missionId),
    ...option,
  });
};

export const useGetMissionDetailNoSuspense = (
  missionId: string,
  option?: Omit<UseQueryOptions<MissionContentType>, 'enabled'>, // TODO 수정 필요, 임시 방편
) => {
  return useQuery<MissionContentType>({
    queryKey: getQueryKey('missionDetail', { missionId }),
    queryFn: () => MISSION_APIS.getMissionDetail(missionId),
    enabled: Boolean(missionId),
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
      await queryClient.invalidateQueries({ queryKey: getQueryKey('missions') });
      option?.onSuccess?.(...data);
    },
    ...option,
  });
};

export const useFollowMissions = (followId: number, option?: UseQueryOptions<GetFollowMissionsResponse>) => {
  return useQuery<GetFollowMissionsResponse>({
    queryKey: getQueryKey('followMissions', { followId }),
    queryFn: () => MISSION_APIS.getFollowMissions(followId),
    ...option,
  });
};

interface GetMissionSummeryResponse {
  symbolStack: number;
  totalMissionHour: number;
  totalMissionMinute: number;
  totalMissionAttainRate: number;
}

const missionsSummeryQueryKey = ['missions-summery'];

export const useGetMissionSummary = (option?: UseQueryOptions<GetMissionSummeryResponse>) => {
  return useQuery<GetMissionSummeryResponse>({
    queryKey: missionsSummeryQueryKey,
    queryFn: MISSION_APIS.getMissionSummery,
    ...option,
  });
};
