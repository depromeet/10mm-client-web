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

interface FollowsResponse {
  followingCount: number;
  followerCount: number;
  followStatus: FollowStatus;
}
export enum FollowStatus {
  FOLLOWING = 'FOLLOWING',
  FOLLOWED_BY_ME = 'FOLLOWED_BY_ME',
  NOT_FOLLOWING = 'NOT_FOLLOWING',
}

const FOLLOW_APIS = {
  getFollowMembers: async (): Promise<GetFollowMembersResponse> => {
    const { data } = await apiInstance.get<GetFollowMembersResponse>('/follows/members');
    return data;
  },

  getFollowMissions: async (followId: number): Promise<GetFollowMissionsResponse> => {
    const { data } = await apiInstance.get(`/missions/follow/${followId}`);
    return data;
  },
  getFollowsMe: async (): Promise<FollowsResponse> => {
    const { data } = await apiInstance.get<FollowsResponse>('/follows/me');
    return data;
  },
  getFollowsTargetId: async (followId: number): Promise<FollowsResponse> => {
    const { data } = await apiInstance.get<FollowsResponse>(`/follows/${followId}`);
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

export const useFollowsCountMembers = (option?: UseQueryOptions<FollowsResponse>) => {
  return useQuery<FollowsResponse>({
    queryKey: getQueryKey('followsCountMe'),
    queryFn: FOLLOW_APIS.getFollowsMe,
    ...option,
  });
};

export const useFollowsCountTargetId = (followId: number, option?: UseQueryOptions<FollowsResponse>) => {
  return useQuery<FollowsResponse>({
    queryKey: getQueryKey('followsCountTargetId', { followId }),
    queryFn: () => FOLLOW_APIS.getFollowsTargetId(followId),
    ...option,
  });
};
