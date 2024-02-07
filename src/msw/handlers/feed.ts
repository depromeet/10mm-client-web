import { http, HttpResponse } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_SEVER_API;

const getFeedResponse = {
  success: true,
  status: 200,
  data: [
    {
      memberId: 5,
      missionId: 7,
      recordId: 6,
      name: '미션4',
      remark: '이 화면 작업중이에용',
      nickname: '도모',
      recordImageUrl: 'https://kr.object.ncloudstorage.com/10mm-images/dev/mission_record/20/image.png',
      profileImage: null,
      duration: 14,
      sinceDay: 13,
      startedAt: '2024-01-23 15:13:07',
      finishedAt: '2024-01-22 15:34:36',
    },
    {
      memberId: 5,
      missionId: 8,
      recordId: 27,
      name: '미션5',
      remark: '이 화면 작업중이에용',
      recordImageUrl: 'https://kr.object.ncloudstorage.com/10mm-images/dev/mission_record/20/image.png',

      nickname: '도모',
      profileImage: null,
      duration: 14,
      sinceDay: 13,
      startedAt: '2024-01-23 15:13:07',
      finishedAt: '2024-01-22 15:34:36',
    },
    {
      memberId: 1,
      missionId: 2,
      recordId: 9,
      name: '미션2',
      remark: null,
      nickname: '도모',
      profileImage: null,
      recordImageUrl: 'https://kr.object.ncloudstorage.com/10mm-images/dev/mission_record/20/image.png',

      duration: 12,
      sinceDay: 34,
      startedAt: '2024-01-03 00:00:00',
      finishedAt: '2024-01-03 00:12:30',
    },
  ],
  timestamp: '2024-02-05T10:14:08.636259',
};

const getFeeds = http.get(BASE_URL + '/feed', () => {
  return HttpResponse.json(getFeedResponse);
});

const feedHandlers = [getFeeds];

export default feedHandlers;
