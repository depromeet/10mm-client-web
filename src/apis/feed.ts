import getQueryKey from '@/apis/getQueryKey';
import apiInstance from '@/apis/instance.api';
import { type FeedBaseType, type FeedItemType } from '@/apis/schema/feed';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

type GetFeedMeResponse = Array<FeedItemType>;

type GetFeedByMemberIdResponse = Array<FeedBaseType>;

export type FeedVisibilityType = 'ALL' | 'FOLLOWER' | 'NONE';

export const FEED_API = {
  getFeedMe: async (): Promise<GetFeedMeResponse> => {
    const { data } = await apiInstance.get('/feed/me');
    return data;
  },
  getFeed: async (memberId: number): Promise<GetFeedByMemberIdResponse> => {
    const { data } = await apiInstance.get(`/feed/${memberId}`);
    return data;
  },
  getFeedList: async (visibility: FeedVisibilityType): Promise<GetFeedMeResponse> => {
    const { data } = await apiInstance.get('/feed', { params: { visibility } });
    return data;
  },
};

export const useFeedMe = (options?: UseQueryOptions<GetFeedMeResponse>) => {
  return useQuery<GetFeedMeResponse>({
    ...options,
    queryKey: getQueryKey('feedMe'),
    queryFn: FEED_API.getFeedMe,
  });
};

export const useFeedByMemberId = (memberId: number, options?: UseQueryOptions<GetFeedByMemberIdResponse>) => {
  return useQuery<GetFeedByMemberIdResponse>({
    ...options,
    queryKey: getQueryKey('feed', { memberId }),
    queryFn: () => FEED_API.getFeed(memberId),
  });
};

export const useGetFeedList = (visibility: FeedVisibilityType, options?: UseQueryOptions<GetFeedMeResponse>) => {
  return useQuery<GetFeedMeResponse>({
    ...options,
    queryKey: getQueryKey('feedList', { visibility }),
    queryFn: () => FEED_API.getFeedList(visibility),
  });
};
