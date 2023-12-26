import axios, { type AxiosInstance } from 'axios';

const BASE_URL = 'https://api.10mm.today';
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
    baseURL: BASE_URL,
    timeout: BASE_TIMEOUT,
  }),
);

export default axiosInstance;
