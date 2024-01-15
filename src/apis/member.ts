import apiInstance from '@/apis/instance.api';
import { type UploadBaseRequest, type UploadUrlBaseResponse } from '@/apis/schema/upload';

interface WithdrawalMemberRequest {
  username: string;
}

interface CheckUsernameRequest {
  username: string;
}

interface UploadProfileImageCompleteRequest extends UploadBaseRequest {
  nickname: string;
}

const MEMBER_API = {
  withdrawalMember: async (request: WithdrawalMemberRequest) => {
    const { data } = await apiInstance.delete(`/members/withdrawal`, {
      data: request,
    });
    return data;
  },
  checkUsername: async (request: CheckUsernameRequest) => {
    const { data } = await apiInstance.post(`/members/check-username`, request);
    return data;
  },
  uploadProfileImage: async (request: UploadBaseRequest): Promise<UploadUrlBaseResponse> => {
    const { data } = await apiInstance.post(`/members/me/upload-url`, request);
    return data;
  },
  uploadProfileImageComplete: async (request: UploadProfileImageCompleteRequest) => {
    const { data } = await apiInstance.post(`/members/me/upload-complete`, request);
    return data;
  },
};
