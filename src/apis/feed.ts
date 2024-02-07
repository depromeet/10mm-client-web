import getQueryKey from '@/apis/getQueryKey';
import apiInstance from '@/apis/instance.api';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export interface FeedItemType {
  memberId: number;
  missionId: number;
  recordId: number;
  name: string;
  remark: string;
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
  getFeed: async (): Promise<GetFeedResponse> => {
    const { data } = await apiInstance.get('/feed');
    return data;
  },
};

export const useFeed = (options?: UseQueryOptions<GetFeedResponse>) => {
  return useQuery<GetFeedResponse>({
    ...options,
    queryKey: getQueryKey('feed'),
    queryFn: FEED_API.getFeed,
  });
};
