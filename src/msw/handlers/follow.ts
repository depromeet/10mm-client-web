import { http, HttpResponse } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_SEVER_API;

const getFollowMembersResponse = {
  success: true,
  status: 200,
  data: [
    {
      memberId: 2,
      nickname: '도모',
      profileImageUrl: 'https://image.10mm.today/local/member_profile/1/image.jpeg',
    },
    {
      memberId: 4,
      nickname: '동민이',
      profileImageUrl: 'https://image.10mm.today/local/member_profile/1/image.jpeg',
    },
  ],
  timestamp: '2024-01-24T00:53:03.643373',
};

const getFollowMembers = http.get(BASE_URL + '/follows/members', () => {
  return HttpResponse.json(getFollowMembersResponse);
});

const followHandlers = [getFollowMembers];

export default followHandlers;
