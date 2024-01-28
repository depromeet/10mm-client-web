import getQueryKey from '@/apis/getQueryKey';
import apiInstance from '@/apis/instance.api';
import { type MissionItemTypeWithRecordId } from '@/apis/schema/mission';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

interface FollowMember {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
}

type GetFollowMembersResponse = FollowMember[];

interface GetFollowMissionsResponse {
  symbolStack: number;
  followMissions: MissionItemTypeWithRecordId[];
}

export const FOLLOW_API = {
  getFollowMembers: async (): Promise<GetFollowMembersResponse> => {
    const { data } = await apiInstance.get<GetFollowMembersResponse>('/follows/members');
    return data;
  },

  getFollowMissions: async (followId: number): Promise<GetFollowMissionsResponse> => {
    const { data } = await apiInstance.get(`/missions/follow/${followId}`);
    return data;
  },
  addFollow: async (targetId: number) => {
    const { data } = await apiInstance.post(`/follows`, { targetId });
    return data;
  },
  deleteFollow: async (targetId: number) => {
    const { data } = await apiInstance.delete(`/follows`, { data: { targetId } });
    return data;
  },
};

export const useFollowMembers = (options?: UseQueryOptions<GetFollowMembersResponse>) => {
  return useQuery<GetFollowMembersResponse>({
    ...options,
    queryKey: getQueryKey('followMembers'),
    queryFn: FOLLOW_API.getFollowMembers,
  });
};

export const useFollowMissions = (followId: number, option?: UseQueryOptions<GetFollowMissionsResponse>) => {
  return useQuery<GetFollowMissionsResponse>({
    queryKey: getQueryKey('followMissions', { followId }),
    queryFn: () => FOLLOW_API.getFollowMissions(followId),
    ...option,
  });
};
