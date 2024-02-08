import getQueryKey from '@/apis/getQueryKey';
import apiInstance from '@/apis/instance.api';
import { type FollowerMemberWithStatusType, type FollowMemberType, type FollowStatus } from '@/apis/schema/member';
import { type MissionItemTypeWithRecordId } from '@/apis/schema/mission';
import useMutationHandleError from '@/hooks/query/useMutationHandleError';
import { useMutation, type UseMutationOptions, useQuery, type UseQueryOptions } from '@tanstack/react-query';

type GetFollowMembersResponse = FollowMemberType[];

interface GetFollowMissionsResponse {
  symbolStack: number;
  followMissions: MissionItemTypeWithRecordId[];
}

interface FollowsResponse {
  followingCount: number;
  followerCount: number;
  followStatus: FollowStatus;
}

interface FollowListResponse {
  targetNickname: string;
  followingList: FollowerMemberWithStatusType[];
  followerList: FollowerMemberWithStatusType[];
}

interface DeleteFollowResponse {
  followStatus: FollowStatus;
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
  deleteFollow: async (targetId: number): Promise<DeleteFollowResponse> => {
    const { data } = await apiInstance.delete(`/follows`, { data: { targetId } });
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
  getFollowList: async (targetId: number): Promise<FollowListResponse> => {
    const { data } = await apiInstance.get<FollowListResponse>(`/follows/${targetId}/list`);
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

export const useFollowsCountMembers = (option?: UseQueryOptions<FollowsResponse>) => {
  return useQuery<FollowsResponse>({
    queryKey: getQueryKey('followsCountMe'),
    queryFn: FOLLOW_API.getFollowsMe,
    ...option,
  });
};

export const useFollowsCountTargetId = (followId: number, option?: UseQueryOptions<FollowsResponse>) => {
  return useQuery<FollowsResponse>({
    queryKey: getQueryKey('followsCountTargetId', { followId }),
    queryFn: () => FOLLOW_API.getFollowsTargetId(followId),
    ...option,
  });
};

export const useFetFollowList = (targetId: number, option?: UseQueryOptions<FollowListResponse>) => {
  return useQuery<FollowListResponse>({
    queryKey: getQueryKey('followList', { targetId }),
    queryFn: () => FOLLOW_API.getFollowList(targetId),
    ...option,
  });
};

export const useAddFollow = (options?: UseMutationOptions<unknown, unknown, number>) =>
  useMutationHandleError(
    { mutationFn: FOLLOW_API.addFollow, ...options },
    {
      offset: 'default',
    },
  );

export const useDeleteFollow = (options?: UseMutationOptions<DeleteFollowResponse, unknown, number>) =>
  useMutationHandleError(
    { mutationFn: FOLLOW_API.deleteFollow, ...options },
    {
      offset: 'default',
    },
  );
