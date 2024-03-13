import getQueryKey from '@/apis/getQueryKey';
import apiInstance from '@/apis/instance.api';
import { type MissionCategory, type MissionStatus } from '@/apis/schema/mission';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

interface MissionSummaryType {
  missionId: number;
  name: string;
  category: MissionCategory;
  visibility: string;
  missionStatus: MissionStatus;
}

interface MissionSummaryListResponse {
  missionAllCount: number;
  missionCompleteCount: number;
  missionNoneCount: number;
  missionSummaryItems: MissionSummaryType[];
}

const RESULT_API = {
  getMissionSummaryList: async (date: string): Promise<MissionSummaryListResponse> => {
    const { data } = await apiInstance.get(`/missions/summary-list?date=${date}`);
    return data;
  },
};

export default RESULT_API;

export const useGetMissionSummaryList = (date: string, option?: UseQueryOptions<MissionSummaryListResponse>) => {
  return useQuery<MissionSummaryListResponse>({
    queryKey: getQueryKey('missionSummaryList', { date }),
    queryFn: () => RESULT_API.getMissionSummaryList(date),
    enabled: Boolean(date),
    ...option,
  });
};
