import { http, HttpResponse } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_SEVER_API;

const getMissions = http.get(BASE_URL + '/missions', ({ params }) => {
  // if (!params.size) HttpResponse.error();

  const requestParamsKeys = ['size', 'lastId'];
  const paramsKey = Object.keys(params);

  if (!paramsKey.every((key) => requestParamsKeys.includes(key))) HttpResponse.error();

  return HttpResponse.json({
    data: {
      content: [
        {
          missionId: 3,
          name: '123 mock server',
          content: '123',
          category: 'STUDY',
          visibility: 'ALL',
          status: 'NONE',
          sort: 2,
        },
        // {
        //   missionId: 1,
        //   name: 'default name',
        //   content: 'default content',
        //   category: 'STUDY',
        //   visibility: 'ALL',
        //   status: 'NONE',
        //   sort: 1,
        // },
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
    },
  });
});

const getMission = http.get(BASE_URL + '/missions/2', ({ params }) => {
  const requestParamsKeys = ['missionId'];
  const paramsKey = Object.keys(params);

  if (!paramsKey.every((key) => requestParamsKeys.includes(key))) HttpResponse.error();

  return HttpResponse.json({
    data: {
      content: {
        missionId: 2,
        name: '123 mock server',
        content: '123',
        category: 'STUDY',
        visibility: 'ALL',
        status: 'NONE',
      },
    },
  });
});

const missionHandlers = [getMissions, getMission];

export default missionHandlers;
