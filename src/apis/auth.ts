import apiInstance from '@/apis/instance.api';
import { ROUTER } from '@/constants/router';
import { storeToken } from '@/services/auth/actions';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

interface SocialLoginRequest {
  provider: string;
  idToken: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface RegisterRequest {
  nickname: string;
}

interface FcmTokenRequest {
  fcmToken: string;
}

export const AUTH_APIS = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiInstance.post(ROUTER.AUTH.LOGIN, {
      ...request,
    });
    await storeToken(data);
    return data;
  },

  socialLogin: async (request: SocialLoginRequest): Promise<LoginResponse> => {
    const { data } = await apiInstance.post(ROUTER.AUTH.SOCIAL_LOGIN(request.provider), {
      idToken: request.idToken,
    });
    await storeToken(data);
    return data;
  },

  tempRegister: async (request: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiInstance.post(ROUTER.AUTH.TEMP_REGISTER, {
      ...request,
    });
    await storeToken(data);
    return data;
  },

  register: async (request: RegisterRequest) => {
    const { data } = await apiInstance.post(ROUTER.AUTH.REGISTER, {
      ...request,
    });
    return data;
  },

  fcmUpdate: async (request: FcmTokenRequest) => {
    const { data } = await apiInstance.patch('/members/fcm-token', {
      fcmToken: request.fcmToken,
    });
    return data;
  },
};

export const useTempRegister = (option?: UseMutationOptions<LoginResponse, AxiosError, LoginRequest>) => {
  return useMutation({
    mutationFn: AUTH_APIS.tempRegister,

    ...option,
  });
};

export const useLogin = (option?: UseMutationOptions<LoginResponse, AxiosError, LoginRequest>) => {
  return useMutation({
    mutationFn: AUTH_APIS.login,
    onSuccess: (...data) => {
      option?.onSuccess?.(...data);
    },
    onError: (...data) => {
      option?.onError?.(...data);
    },
    ...option,
  });
};

// TODO onSuccess, onError 역할 및 동작 파악해보고 추후에 제거 혹은 수정
export const useSocialLogin = (option?: UseMutationOptions<LoginResponse, AxiosError, SocialLoginRequest>) => {
  return useMutation({
    mutationFn: AUTH_APIS.socialLogin,
    onSuccess: (...data) => {
      option?.onSuccess?.(...data);
    },
    onError: (...data) => {
      option?.onError?.(...data);
    },
    ...option,
  });
};

export const useNicknameRegister = (option?: UseMutationOptions<RegisterRequest, AxiosError, RegisterRequest>) => {
  return useMutation({
    mutationFn: AUTH_APIS.register,
    ...option,
  });
};

export const useUpdateMemberFcmToken = (option?: UseMutationOptions<FcmTokenRequest, AxiosError, FcmTokenRequest>) => {
  return useMutation({
    mutationFn: AUTH_APIS.fcmUpdate,
    ...option,
  });
};
