import getQueryKey from '@/apis/getQueryKey';
import { MissionCategory, MissionStatus } from '@/apis/schema/mission';
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
  missionList: MissionSummaryType[];
}

const MissionSummaryListData: MissionSummaryListResponse = {
  missionAllCount: 3,
  missionCompleteCount: 1,
  missionNoneCount: 1,
  missionList: [
    {
      missionId: 1,
      name: 'UX방법론 1챕터씩 공부하기!',
      category: MissionCategory.STUDY,
      visibility: 'ALL',
      missionStatus: MissionStatus.COMPLETED,
    },
    {
      missionId: 2,
      name: '스쿼트하고 닭다리 되기!',
      category: MissionCategory.STUDY,
      visibility: 'ALL',
      missionStatus: MissionStatus.NONE,
    },
  ],
};

const RESULT_API = {
  getMissionSummaryList: async (_: string): Promise<MissionSummaryListResponse> => {
    // // const { data } = await apiInstance.get(`/missions/summary-list?date=${date}`);
    // const { data } = await apiInstance.get(`/missions/summary-list`);
    // return data;
    return MissionSummaryListData;
  },
};

export default RESULT_API;

export const useGetMissionSummaryList = (date: string, option?: UseQueryOptions<MissionSummaryListResponse>) => {
  return useQuery<MissionSummaryListResponse>({
    queryKey: getQueryKey('missionSummaryList', { date }),
    queryFn: () => RESULT_API.getMissionSummaryList(date),
    ...option,
  });
};
