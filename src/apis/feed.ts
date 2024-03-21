import getQueryKey from '@/apis/getQueryKey';
import apiInstance from '@/apis/instance.api';
import { type FeedBaseType, type FeedItemType } from '@/apis/schema/feed';
import { useInfiniteQuery, type UseInfiniteQueryOptions, useQuery, type UseQueryOptions } from '@tanstack/react-query';

interface GetFeedListRequest {
  visibility: FeedVisibilityType;
  size: number;
  lastId?: number;
}

type GetFeedListResponse = {
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
  getFeedList: async (request: GetFeedListRequest): Promise<GetFeedListResponse> => {
    const { data } = await apiInstance.get('/feed/me', {
      params: request,
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

export const useGetFeedList = (request: GetFeedListRequest, options?: UseQueryOptions<GetFeedListResponse>) => {
  return useQuery<GetFeedListResponse>({
    ...options,
    queryKey: getQueryKey('feedList', request),
    queryFn: () => FEED_API.getFeedList(request),
  });
};

export const useInfiniteFeedList = (
  request: GetFeedListRequest,
  options?: UseInfiniteQueryOptions<GetFeedListResponse>,
) => {
  const queryKey = getQueryKey('feedList', request);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryFn = (param: any) => FEED_API.getFeedList({ ...request, lastId: param.pageParam });

  const getNextPageParam = (lastPage: GetFeedListResponse): number | undefined => {
    return lastPage.last ? undefined : lastPage.content[lastPage.content.length - 1].recordId;
  };

  return useInfiniteQuery({
    ...options,
    queryKey,
    queryFn,
    getNextPageParam,
    initialPageParam: undefined,
    select: (data) => {
      const contents = data.pages.map((page) => page.content).flat();
      return {
        ...data,
        content: contents,
      };
    },
  });
};
