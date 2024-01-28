import { http, HttpResponse } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_SEVER_API;

const followMissionResponse = {
  symbolStack: 210,
  followMissions: [
    {
      missionId: 1,
      name: '오운완',
      content: '오늘은 턱걸이 할겨',
      category: 'STUDY',
      visibility: 'NONE',
      archiveStatus: 'ARCHIVED',
      sort: 1,
      missionStatus: 'COMPLETE',
      ttlFinishedAt: '2023-01-03 00:00:00',
      missionRecordId: 0,
    },

    {
      missionId: 2,
      name: '오운완',
      content: '오늘은 턱걸이 할겨',
      category: 'STUDY',
      visibility: 'NONE',
      archiveStatus: 'ARCHIVED',
      sort: 1,
      missionStatus: 'COMPLETE',
      ttlFinishedAt: '2023-01-03 00:00:00',
      missionRecordId: 0,
    },

    {
      missionId: 3,
      name: '오운완',
      content: '오늘은 턱걸이 할겨',
      category: 'STUDY',
      visibility: 'NONE',
      archiveStatus: 'ARCHIVED',
      sort: 1,
      missionStatus: 'COMPLETE',
      ttlFinishedAt: '2023-01-03 00:00:00',
      missionRecordId: 0,
    },

    {
      missionId: 4,
      name: '오운완',
      content: '오늘은 턱걸이 할겨',
      category: 'STUDY',
      visibility: 'NONE',
      archiveStatus: 'ARCHIVED',
      sort: 1,
      missionStatus: 'COMPLETE',
      ttlFinishedAt: '2023-01-03 00:00:00',
      missionRecordId: 0,
    },
  ],
};

const getFollowMission = http.get(BASE_URL + '/missions/follow/:followId', () => {
  return HttpResponse.json({
    data: followMissionResponse,
  });
});

const missionHandlers = [getFollowMission];

export default missionHandlers;
