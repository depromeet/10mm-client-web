import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://api.10mm.today';

const getMissions = http.get(BASE_URL + '/missions', ({ params }) => {
  // if (!params.size) HttpResponse.error();

  const requestParamsKeys = ['size', 'lastId'];
  const paramsKey = Object.keys(params);

  if (!paramsKey.every((key) => requestParamsKeys.includes(key))) HttpResponse.error();

  return HttpResponse.json({
    content: [
      {
        missionId: 0,
        name: 'DFS 문제 풀기',
        content: 'DFS 동작 원리 이해 및 문제 풀어보기',
        category: 'STUDY',
        visibility: 'ALL',
        status: 'NONE',
        sort: 1,
      },
    ],
    first: true,
    last: true,
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      sort: {
        empty: true,
        sorted: true,
        unsorted: true,
      },
      offset: 0,
      paged: true,
      unpaged: true,
    },
    size: 0,
    number: 0,
    numberOfElements: 0,
    empty: true,
  });
});

const missionHandlers = [getMissions];

export default missionHandlers;
