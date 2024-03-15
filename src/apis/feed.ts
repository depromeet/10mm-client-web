import getQueryKey from '@/apis/getQueryKey';
import apiInstance from '@/apis/instance.api';
import { type FeedBaseType, type FeedItemType } from '@/apis/schema/feed';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

interface GetFeedListRequest {
  visibility: FeedVisibilityType;
  size: number;
  lastId?: number;
}

type GetFeedMeResponse = {
  content: Array<FeedItemType>;
  last: boolean;
};

type GetFeedByMemberIdResponse = Array<FeedBaseType>;

export type FeedVisibilityType = 'ALL' | 'FOLLOWER' | 'NONE';

export const FEED_API = {
  getFeed: async (memberId: number): Promise<GetFeedByMemberIdResponse> => {
    const { data } = await apiInstance.get(`/feed/${memberId}`);
    return data;
  },
  getFeedList: async (request: GetFeedListRequest): Promise<GetFeedMeResponse> => {
    const { data } = await apiInstance.get('/feed/me', {
      params: { visibility: request.visibility, size: 10, lastId: 70 },
    });
    return data;
  },
};

export const useFeedByMemberId = (memberId: number, options?: UseQueryOptions<GetFeedByMemberIdResponse>) => {
  return useQuery<GetFeedByMemberIdResponse>({
    ...options,
    queryKey: getQueryKey('feed', { memberId }),
    queryFn: () => FEED_API.getFeed(memberId),
  });
};

export const useGetFeedList = (request: GetFeedListRequest, options?: UseQueryOptions<GetFeedMeResponse>) => {
  return useQuery<GetFeedMeResponse>({
    ...options,
    queryKey: getQueryKey('feedList', request),
    queryFn: () => FEED_API.getFeedList(request),
  });
};
