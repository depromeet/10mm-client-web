import getQueryKey from '@/apis/getQueryKey';
import apiInstance from '@/apis/instance.api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export interface FeedItemType {
  memberId: number;
  missionId: number;
  recordId: number;
  name: string;
  remark?: string;
  nickname: string;
  profileImage?: string;
  recordImageUrl: string;
  duration: number;
  sinceDay: number;
  startedAt: string;
  finishedAt: string;
}

type GetFeedResponse = Array<FeedItemType>;

export const FEED_API = {
  getFeedMe: async (): Promise<GetFeedResponse> => {
    const { data } = await apiInstance.get('/feed/me');
    return data;
  },
  getFeed: async (memberId: number): Promise<GetFeedResponse> => {
    const { data } = await apiInstance.get(`/feed/${memberId}}`);
    return data;
  },
};

export const useFeedMe = (options?: UseQueryOptions<GetFeedResponse>) => {
  return useQuery<GetFeedResponse>({
    ...options,
    queryKey: getQueryKey('feedMe'),
    queryFn: FEED_API.getFeedMe,
  });
};

export const useFeedByMemberId = (memberId: number, options?: UseQueryOptions<GetFeedResponse>) => {
  return useQuery<GetFeedResponse>({
    ...options,
    queryKey: getQueryKey('feed', { memberId }),
    queryFn: () => FEED_API.getFeed(memberId),
  });
};
