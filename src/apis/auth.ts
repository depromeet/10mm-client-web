import apiInstance from '@/apis/instance.api';
import { storeToken } from '@/services/auth/actions';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { type AxiosError } from 'axios';

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

interface CheckUsernameRequest {
  username: string;
}

export const AUTH_APIS = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiInstance.post('/auth/login', {
      ...request,
    });
    await storeToken(data);
    return data;
  },

  tempRegister: async (request: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiInstance.post('/auth/temp-register', {
      ...request,
    });
    await storeToken(data);
    return data;
  },

  register: async (request: RegisterRequest) => {
    const { data } = await apiInstance.post('/auth/register', {
      ...request,
    });
    return data;
  },
  checkUsername: (data: CheckUsernameRequest) => {
    return apiInstance.post(`/auth/check-username`, {
      ...data,
    });
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

export const useNicknameRegister = (option?: UseMutationOptions<RegisterRequest, AxiosError, RegisterRequest>) => {
  return useMutation({
    mutationFn: AUTH_APIS.register,
    ...option,
  });
};
