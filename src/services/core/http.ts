import axios, { AxiosError } from 'axios';

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error(error);
  }

  /**
  if (expectedError && error.response.status === 401) {
    login();
  }
  */

  return Promise.reject(error);
});

const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setToken,
};
