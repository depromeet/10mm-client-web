import axios, { type AxiosInstance } from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_SEVER_API;
const BASE_TIMEOUT = 10000;

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
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
