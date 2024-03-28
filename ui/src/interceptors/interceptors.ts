import { notification } from 'antd';
import axios from 'axios';
import { HttpHeader } from 'enums';
import { environment } from 'environments';

export const protectedAxios = axios.create();

// A request interceptor
protectedAxios.interceptors.request.use(
  function onRequest(config) {
    config.headers.set(HttpHeader.ApiKey, environment.apiKey);
    config.headers.set(HttpHeader.ApiHost, environment.apiResource);
    return config;
  },
  function onError(error) {
    notification.error({
      message: 'Something wrong...',
      description: `Error during preparing the request: ${error.message}`,
    });
    return Promise.reject(error);
  },
);

// A response interceptor
protectedAxios.interceptors.response.use(
  function onResponse(response) {
    return response;
  },
  function onError(error) {
    notification.error({
      message: 'Something wrong...',
      description: `Error executing the request: ${error.message}`,
    });
    return Promise.reject(error);
  },
);