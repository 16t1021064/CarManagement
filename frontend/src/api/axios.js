/* eslint-disable no-alert */
/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('jwt_token');
  config.headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      throw error;
    }
    const statusCode = error.response.status;
    const messageInfo = error.response.data.message;
    if (statusCode === 404) {
      window.location.href = '/not-found';
      return;
    }
    if (statusCode === 401) {
      if (messageInfo === 'Incorrect email or password') {
        window.location.href = '/login?e=1';
        return;
      }
      window.location.href = '/login';
      return;
    }
    if (statusCode === 403) {
      window.location.href = '/forbidden';
      return;
    }
    if (statusCode === 500) {
      // show notification
      toast.error('System has an error');
      window.location.href = '/not-found';
      return;
    }
    if (statusCode === 400) {
      window.location.href = '/not-found';
      return;
    }
    throw error;
  },
);

export default axiosInstance;
