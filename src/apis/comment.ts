import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import apiInstance from './instance.api';

interface CreateCommentRequest {
  recordId: number;
  content: string;
}

interface CommentDto {
  commentId: number;
  content: string;
  createdAt: string;
}

interface ModifyCommentRequest {
  commentId: number;
  content: string;
}

const COMMENT_APIS = {
  createComment: (data: CreateCommentRequest) => {
    return apiInstance.post('/comments', {
      ...data,
    });
  },

  modifyComment:
    (commentId: string) =>
    async (data: ModifyCommentRequest): Promise<CommentDto> => {
      return apiInstance.put(`/comments/${commentId}`, {
        ...data,
      });
    },

  deleteComment: (commentId: string) => {
    return apiInstance.delete(`/comments/${commentId}`);
  },
};

export default COMMENT_APIS;

export const useModifyCommentMutation = (
  commentId: string,
  options?: UseMutationOptions<CommentDto, unknown, ModifyCommentRequest>,
) => {
  return useMutation({ mutationFn: COMMENT_APIS.modifyComment(commentId), ...options });
};

export const useDeleteCommentMutation = (commentId: string, options?: UseMutationOptions) => {
  return useMutation({
    mutationFn: () => COMMENT_APIS.deleteComment(commentId),
    ...options,
  });
};
