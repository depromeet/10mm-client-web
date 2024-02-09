import getQueryKey from '@/apis/getQueryKey';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

interface MissionSummaryType {
  missionId: number;
  name: string;
  category: string;
  visibility: string;
  missionStatus: string;
}

interface MissionSummaryListResponse {
  missionAllCount: number;
  missionCompleteCount: number;
  missionNoneCount: number;
  missionList: MissionSummaryType[];
}

const MissionSummaryListData = {
  missionAllCount: 0,
  missionCompleteCount: 0,
  missionNoneCount: 0,
  missionList: [
    {
      missionId: 1,
      name: 'UX방법론 1챕터씩 공부하기!',
      category: 'STUDY',
      visibility: 'ALL',
      missionStatus: 'COMPLETED',
    },
    {
      missionId: 2,
      name: '스쿼트하고 닭다리 되기!',
      category: 'STUDY',
      visibility: 'ALL',
      missionStatus: 'COMPLETED',
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
