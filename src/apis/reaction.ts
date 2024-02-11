import getQueryKey from '@/apis/getQueryKey';
import { type EmojiType } from '@/apis/schema/reaction';
import useMutationHandleError from '@/hooks/query/useMutationHandleError';
import { type UseMutationOptions, useQuery } from '@tanstack/react-query';

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
  emojiType: EmojiType;
  count: number;
  reactions: ReactionItemType[];
}

export type GetReactionsResponse = Array<ReactionType>;

interface AddReactionRequest {
  missionRecordId: number;
  emojiType: EmojiType;
}

interface AddReactionResponse {
  reactionId: number;
  emojiType: EmojiType;
  memberId: number;
  missionRecordId: number;
}

interface ModifyReactionRequest {
  reactionId: number;
  emojiType: EmojiType;
}

export const REACTION_API = {
  getReactions: async (recordId: number): Promise<GetReactionsResponse> => {
    const { data } = await apiInstance.get<GetReactionsResponse>(`/reactions?missionRecordId=${recordId}`);
    return data;
  },
  addReaction: async (request: AddReactionRequest) => {
    const { data } = await apiInstance.post<AddReactionResponse>('/reactions', request);
    return data;
  },
  modifyReaction: async ({ reactionId, emojiType }: ModifyReactionRequest) => {
    console.log('reactionId: ', reactionId);
    const { data } = await apiInstance.put<AddReactionResponse>(`/reactions/${reactionId}`, { emojiType });
    return data;
  },
};

export const useGetReactions = (recordId: number) => {
  return useQuery<GetReactionsResponse>({
    queryKey: getQueryKey('reactions', { recordId }),
    queryFn: () => REACTION_API.getReactions(recordId),
  });
};

export const useAddReaction = (options?: UseMutationOptions<AddReactionResponse, unknown, AddReactionRequest>) =>
  useMutationHandleError(
    { mutationFn: REACTION_API.addReaction, ...options },
    {
      offset: 'default',
    },
  );

export const useModifyReaction = (options?: UseMutationOptions<AddReactionResponse, unknown, ModifyReactionRequest>) =>
  useMutationHandleError(
    { mutationFn: REACTION_API.modifyReaction, ...options },
    {
      offset: 'default',
    },
  );
