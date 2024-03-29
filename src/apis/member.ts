import getQueryKey from '@/apis/getQueryKey';
import apiInstance from '@/apis/instance.api';
import { type FollowerMemberWithStatusType, type MemberType } from '@/apis/schema/member';
import { type UploadBaseRequest, type UploadUrlBaseResponse } from '@/apis/schema/upload';
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  useSuspenseQuery,
} from '@tanstack/react-query';
import axios from 'axios';

interface CheckUsernameRequest {
  username: string;
}

interface CheckNicknameRequest {
  nickname: string;
}

interface UploadProfileImageCompleteRequest extends Partial<UploadBaseRequest> {
  nickname: string;
}

interface SocialLoginInfoResponse {
  provider: AUTH_PROVIDER;
  email: 'string';
}

type SearchNicknameResponse = FollowerMemberWithStatusType[];

enum AUTH_PROVIDER {
  KAKAO = 'KAKAO',
  APPLE = 'APPLE',
}

export const AUTH_PROVIDER_LABEL = {
  [AUTH_PROVIDER.KAKAO]: '카카오',
  [AUTH_PROVIDER.APPLE]: '애플',
};

type MemberMeResponse = MemberType;

const MEMBER_API = {
  withdrawalMember: async () => {
    const { data } = await apiInstance.delete(`/members/withdrawal`);
    return data;
  },
  getMembersMe: async (): Promise<MemberMeResponse> => {
    const { data } = await apiInstance.get(`/members/me`);
    return data;
  },
  getMembersById: async (id: number): Promise<MemberMeResponse> => {
    const { data } = await apiInstance.get(`/members/${id}`);
    return data;
  },
  checkUsername: async (request: CheckUsernameRequest) => {
    const { data } = await apiInstance.post(`/members/check-username`, request);
    return data;
  },

  checkNickname: async (request: CheckNicknameRequest) => {
    const { data } = await apiInstance.post(`/members/check-nickname`, request);
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
  getSocialLoginInfo: async (): Promise<SocialLoginInfoResponse> => {
    const { data } = await apiInstance.get(`/members/me/social`);
    return data;
  },
  searchNickname: async (nickname: string): Promise<SearchNicknameResponse> => {
    const { data } = await apiInstance.get(`/members/search?nickname=${nickname}`);
    return data;
  },
};

export const useCheckNickname = (option?: UseMutationOptions<unknown, unknown, CheckNicknameRequest>) => {
  return useMutation({
    mutationFn: MEMBER_API.checkNickname,
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
      if (data && imageFile) {
        return await uploadS3(data.presignedUrl, imageFile);
      }
    },
    ...option,
  });
};

export const useUploadProfileImageComplete = (
  option?: UseMutationOptions<unknown, unknown, UploadProfileImageCompleteRequest>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: MEMBER_API.uploadProfileImageComplete,

    ...option,
    onSuccess: (...res) => {
      option?.onSuccess && option.onSuccess(...res);
      return queryClient.invalidateQueries({ queryKey: getQueryKey('member', { me: undefined }) });
    },
  });
};

export const useGetMembersMe = (option?: UseQueryOptions<MemberMeResponse>) => {
  return useQuery({
    queryKey: getQueryKey('member', { me: undefined }),
    queryFn: () => MEMBER_API.getMembersMe(),
    ...option,
  });
};

export const useGetMyId = (): {
  memberId?: number;
  isLoading: boolean;
} => {
  const { data, isLoading } = useGetMembersMe();
  const memberId = data?.memberId;
  return { memberId, isLoading };
};

export const useWithdrawalMember = (option?: UseMutationOptions<unknown, unknown>) => {
  return useMutation({
    mutationFn: MEMBER_API.withdrawalMember,
    ...option,
  });
};

export const useGetSocialLoginInfo = (option?: UseQueryOptions<SocialLoginInfoResponse>) => {
  return useQuery({
    queryKey: getQueryKey('memberSocial'),
    queryFn: () => MEMBER_API.getSocialLoginInfo(),
    ...option,
  });
};

export const useGetSearchNickname = (
  nickname: string,
  option?: Omit<UseQueryOptions<SearchNicknameResponse>, 'queryKey'>,
) => {
  return useQuery({
    queryKey: getQueryKey('searchNickname', { nickname }),
    queryFn: () => MEMBER_API.searchNickname(nickname),
    ...option,
  });
};

export const useSuspenseGetSearchNickname = (
  nickname: string,
  option?: Omit<UseQueryOptions<SearchNicknameResponse>, 'queryKey'>,
) => {
  return useSuspenseQuery<SearchNicknameResponse>({
    queryKey: getQueryKey('searchNickname', { nickname }),
    queryFn: () => (nickname ? MEMBER_API.searchNickname(nickname) : []),
    ...option,
  });
};

export const useGetMembersById = (id: number, option?: UseQueryOptions<MemberMeResponse>) => {
  return useQuery({
    queryKey: getQueryKey('member', { id }),
    queryFn: () => MEMBER_API.getMembersById(id),
    ...option,
  });
};
