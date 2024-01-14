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

const getRecordDetail = http.get(BASE_URL + `/records/123`, () => {
  return HttpResponse.json({
    data: recordDetailResponse,
  });
});

const postUploadComplete = http.post(BASE_URL + '/records/upload-complete', ({ params }) => {
  if (!params.remark) HttpResponse.error();

  const requestParamsKeys = ['missionRecordId', 'imageFileExtension', 'remark'];
  const paramsKey = Object.keys(params);

  if (!paramsKey.every((key) => requestParamsKeys.includes(key))) HttpResponse.error();

  return HttpResponse.json({ presignedUrl: 'http://localhost:3000' });
});

const uploadUrl = http.post(BASE_URL + '/records/upload-url', ({ params }) => {
  if (!params.remark) HttpResponse.error();

  const requestParamsKeys = ['missionRecordId', 'imageFileExtension'];
  const paramsKey = Object.keys(params);

  if (!paramsKey.every((key) => requestParamsKeys.includes(key))) HttpResponse.error();

  return HttpResponse.json({});
});

const recordHandlers = [getRecordDetail, postUploadComplete, uploadUrl];
export default recordHandlers;
