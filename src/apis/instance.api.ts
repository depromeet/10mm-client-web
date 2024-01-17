import { getTokens } from '@/services/auth/actions';
import axios, { type AxiosInstance } from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_SEVER_API;
const BASE_TIMEOUT = 10000;

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      const { accessToken, refreshToken } = await getTokens();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      if (refreshToken) {
        config.headers['Refresh-Token'] = `Bearer ${refreshToken}`;
      }
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
      return Promise.reject(error);
    },
  );

  return instance;
};

const axiosInstance = setInterceptors(
  axios.create({
    timeout: BASE_TIMEOUT,
    baseURL: BASE_URL,
  }),
);

export default axiosInstance;

//TODO : error response type 정의
interface ErrorResponse {
  response: {
    data: {
      data: {
        errorClassName: string;
        message: string;
      };
    };
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSeverError = (e: any): e is ErrorResponse => {
  if (!e) return false;
  if ('response' in e) {
    return 'data' in e.response && 'data' in e.response.data && 'errorClassName' in e.response.data.data;
  }

  return false;
};
