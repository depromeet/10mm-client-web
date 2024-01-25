import getQueryKey from '@/apis/getQueryKey';
import apiInstance from '@/apis/instance.api';
import MISSION_APIS from '@/apis/mission';
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

const FOLLOW_APIS = {
  getFollowMembers: async (): Promise<GetFollowMembersResponse> => {
    const { data } = await apiInstance.get<GetFollowMembersResponse>('/follow/members');
    return data;
  },

  getFollowMissions: async (followId: number): Promise<GetFollowMissionsResponse> => {
    const { data } = await apiInstance.get(`/missions/follow/${followId}`);
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

export const useFollowMissions = (followId: number, option?: UseQueryOptions<GetFollowMissionsResponse>) => {
  return useQuery<GetFollowMissionsResponse>({
    queryKey: getQueryKey('followMissions', { followId }),
    queryFn: () => FOLLOW_APIS.getFollowMissions(followId),
    ...option,
  });
};
