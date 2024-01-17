import apiInstance from '@/apis/instance.api';
import { type MemberType } from '@/apis/schema/member';
import { type UploadBaseRequest, type UploadUrlBaseResponse } from '@/apis/schema/upload';
import { useMutation, type UseMutationOptions, useQuery, type UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

interface WithdrawalMemberRequest {
  username: string;
}

interface CheckUsernameRequest {
  username: string;
}

interface UploadProfileImageCompleteRequest extends UploadBaseRequest {
  nickname: string;
}

type MemberMeResponse = MemberType;

const MEMBER_API = {
  withdrawalMember: async (request: WithdrawalMemberRequest) => {
    const { data } = await apiInstance.delete(`/members/withdrawal`, {
      data: request,
    });
    return data;
  },
  getMembersMe: async (): Promise<MemberMeResponse> => {
    const { data } = await apiInstance.get(`/members/me`);
    return data;
  },
  checkUsername: async (request: CheckUsernameRequest) => {
    const { data } = await apiInstance.post(`/members/check-username`, request);
    return data;
  },
  uploadProfileImage: async (request: UploadBaseRequest): Promise<UploadUrlBaseResponse> => {
    const { data } = await apiInstance.post<UploadUrlBaseResponse>(`/members/me/upload-url`, request);
    return data;
  },
  uploadProfileImageComplete: async (request: UploadProfileImageCompleteRequest) => {
    const { data } = await apiInstance.post(`/members/me/upload-complete`, request);
    return data;
  },
};

export const useCheckUsername = (option?: UseMutationOptions<unknown, unknown, CheckUsernameRequest>) => {
  return useMutation({
    mutationFn: MEMBER_API.checkUsername,
    ...option,
  });
};

const uploadS3 = async (presignedUrl: string, imageFile: File) => {
  await axios.put(presignedUrl, imageFile, { headers: { 'Content-Type': imageFile.type } });
};

export const useUploadProfileImage = (
  imageFile: File | undefined,
  option?: UseMutationOptions<UploadUrlBaseResponse, unknown, UploadBaseRequest>,
) => {
  return useMutation({
    mutationFn: MEMBER_API.uploadProfileImage,
    onSuccess: async (data) => {
      data && imageFile && (await uploadS3(data.presignedUrl, imageFile));
    },
    ...option,
  });
};

export const useUploadProfileImageComplete = (
  option?: UseMutationOptions<unknown, unknown, UploadProfileImageCompleteRequest>,
) => {
  return useMutation({
    mutationFn: MEMBER_API.uploadProfileImageComplete,
    ...option,
  });
};

export const useGetMembersMe = (option?: UseQueryOptions<MemberMeResponse>) => {
  return useQuery({
    queryKey: ['member', 'me'],
    queryFn: () => MEMBER_API.getMembersMe(),

    ...option,
  });
};
