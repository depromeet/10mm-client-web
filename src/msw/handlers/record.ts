import { http, HttpResponse } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_SEVER_API;

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

const recordHandlers = [postUploadComplete, uploadUrl];

export default recordHandlers;
