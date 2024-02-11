import getQueryKey from '@/apis/getQueryKey';
import { useQuery } from '@tanstack/react-query';

import apiInstance from './instance.api';

interface MemberProfileType {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
}

interface ReactionItemType {
  reactionId: number;
  createdAt: string;
  updatedAt: string;
  memberProfile: MemberProfileType;
}

interface ReactionType {
  emojiType: string;
  count: number;
  reactions: ReactionItemType[];
}

export type GetReactionsResponse = Array<ReactionType>;

export const REACTION_API = {
  getReactions: async (recordId: number): Promise<GetReactionsResponse> => {
    const { data } = await apiInstance.get<GetReactionsResponse>(`/reactions?missionRecordId=${recordId}`);
    return data;
  },
};

export const useGetReactions = (recordId: number) => {
  return useQuery<GetReactionsResponse>({
    queryKey: getQueryKey('reactions', { recordId }),
    queryFn: () => REACTION_API.getReactions(recordId),
  });
};
