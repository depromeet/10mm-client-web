import { http, HttpResponse } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_SEVER_API;

const getMembersMe = http.get(BASE_URL + '/members/me', () => {
  return HttpResponse.json({
    data: {
      memberId: 1,
      nickname: 'string',
      profileImageUrl: null,
      username: 'JONO',
    },
  });
});

const memberHandlers = [getMembersMe];

export default memberHandlers;
