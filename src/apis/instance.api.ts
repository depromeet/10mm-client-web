import { ROUTER } from '@/constants/router';
import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_SEVER_API;
const BASE_TIMEOUT = 10000;

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response?.data;
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          window.location.href = ROUTER.AUTH.LOGIN;
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

const axiosInstance = setInterceptors(
  axios.create({
    timeout: BASE_TIMEOUT,
    baseURL: BASE_URL,
    withCredentials: true,
  }),
);

interface ErrorType {
  errorClassName: string;
  message: string;
}

export default axiosInstance;

interface ErrorResponse {
  data: ErrorType;
  status: number;
  success: boolean;
}

interface SeverError extends Omit<AxiosError<ErrorResponse>, 'response'> {
  response: AxiosResponse<ErrorResponse>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSeverError = (e: any): e is SeverError => {
  if (!e) return false;

  if (axios.isAxiosError(e)) {
    if (!e.response) return false;
    return (
      'data' in e.response && 'data' in e.response.data && 'status' in e.response.data && 'success' in e.response.data
    );
  }

  return false;
};
