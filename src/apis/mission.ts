import getQueryKey from '@/apis/getQueryKey';
import {
  type FinishedMissionItemType,
  type MissionCategory,
  type MissionItemTypeWithRecordId,
  type MissionPeriod,
  type MissionVisibility,
} from '@/apis/schema/mission';
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
  missionDuration: MissionPeriod;
}

interface ModifyMissionRequest {
  missionId: number;
  name: string;
  content: string;
  visibility: MissionVisibility;
  // missionDuration: MissionPeriod;
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
  getMissionSummery: async (): Promise<GetMissionSummeryResponse> => {
    const { data } = await apiInstance.get(`/missions/summary`);
    return data;
  },

  getMissionStack: async (missionId: string): Promise<GetMissionStackResponse> => {
    const { data } = await apiInstance.get(`/missions/symbol/${missionId}`);
    return data;
  },

  getFinishedMissions: async (): Promise<GetFinishedMissionsResponse> => {
    const { data } = await apiInstance.get<GetFinishedMissionsResponse>('/missions/finished');
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

export type GetFinishedMissionsResponse = FinishedMissionItemType[];

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
    enabled: Boolean(missionId),
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

interface GetMissionSummeryResponse {
  symbolStack: number;
  totalMissionHour: number;
  totalMissionMinute: number;
  totalMissionAttainRate: number;
}

interface GetMissionStackResponse {
  symbolStack: number;
}

const missionsSummeryQueryKey = ['missions-summery'];

export const useGetMissionSummary = (option?: UseQueryOptions<GetMissionSummeryResponse>) => {
  return useQuery<GetMissionSummeryResponse>({
    queryKey: missionsSummeryQueryKey,
    queryFn: MISSION_APIS.getMissionSummery,
    ...option,
  });
};

export const useGetMissionStack = (missionId: string, option?: UseQueryOptions<GetMissionStackResponse>) => {
  return useQuery<GetMissionStackResponse>({
    queryKey: getQueryKey('missionStack', { missionId }),
    queryFn: () => MISSION_APIS.getMissionStack(missionId),
    enabled: Boolean(missionId),
    ...option,
  });
};

export const useGetFinishedMissions = (option?: UseQueryOptions<GetFinishedMissionsResponse>) => {
  return useQuery<GetFinishedMissionsResponse>({
    queryKey: getQueryKey('finishedMissions'),
    queryFn: MISSION_APIS.getFinishedMissions,
    ...option,
  });
};
