import { http, HttpResponse } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_SEVER_API;

const recordDetailResponse = {
  recordId: 1,
  remark: 'default MissionRecord Remark',
  imageUrl: 'https://ik.imagekit.io/demo/medium_cafe_B1iTdD0C.jpg',
  duration: 21,
  sinceDay: 3,
  startedAt: '2023-01-03 00:00:00',
  finishedAt: '2024-01-03 00:34:00',
};

const getRecordDetail = http.get(BASE_URL + `/records/:recordId`, ({ params }) => {
  console.log('params', params);

  return HttpResponse.json({
    data: recordDetailResponse,
  });
});

const recordHandlers = [getRecordDetail];

export default recordHandlers;
