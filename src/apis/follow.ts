import getQueryKey from '@/apis/getQueryKey';
import apiInstance from '@/apis/instance.api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

interface FollowMember {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
}

type GetFollowMembersResponse = FollowMember[];

const FOLLOW_APIS = {
  getFollowMembers: async (): Promise<GetFollowMembersResponse> => {
    const { data } = await apiInstance.get<GetFollowMembersResponse>('/follow/members');
    return data;
  },
};

export const useFollowMembers = (options?: UseQueryOptions<GetFollowMembersResponse>) => {
  return useQuery<GetFollowMembersResponse>({
    ...options,
    queryKey: getQueryKey('followMembers'),
    queryFn: FOLLOW_APIS.getFollowMembers,
  });
};
