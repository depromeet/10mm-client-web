import { http, HttpResponse } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_SEVER_API;

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

// 미션 전체 현황 - 리스트
const getMissionSummaryList = http.get(BASE_URL + '/missions/summary-list', () => {
  return HttpResponse.json({
    data: MissionSummaryListData,
  });
});

// TODO: 왜 안되지?
const resultHandlers = [getMissionSummaryList];

export default resultHandlers;
