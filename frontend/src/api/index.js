/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import axiosInstance from './axios';

const API_URL_CAR = 'http://localhost:5001/v1/cars';

const API_LOGIN = 'http://localhost:5001/v1/auth';

export const getCar = async (currentPage, searchValue, supplier, cate) => {
  if (supplier === 'Tất cả') {
    // eslint-disable-next-line no-param-reassign
    supplier = '';
  }
  if (cate === 'Tất cả') {
    // eslint-disable-next-line no-param-reassign
    cate = '';
  }
  const pageLimit = 6;
  const carInfo = await axiosInstance.get(`${API_URL_CAR}/?pageCurrent=${currentPage}&pageLimit=${pageLimit}&searchValue=${searchValue}&supplier=${supplier}&category=${cate}`);
  return carInfo;
};

export const getCarById = async (id) => {
  const carInfo = await axiosInstance.get(`${API_URL_CAR}/${id}`);
  return carInfo;
};

export const getAllCategory = async () => {
  const categoryList = await axiosInstance.get(`${API_URL_CAR}/category`);
  return categoryList;
};

export const getAllSupplier = async () => {
  const supplierList = await axiosInstance.get(`${API_URL_CAR}/supplier`);
  return supplierList;
};

export const getTotalCar = async () => {
  const totalCar = await axiosInstance.get(`${API_URL_CAR}/total`);
  return totalCar;
};

export const createCar = async (formData) => {
  const data = await axiosInstance.post(`${API_URL_CAR}`, formData);
  return data;
};

export const deleteCar = async (id) => {
  const result = await axiosInstance.delete(`${API_URL_CAR}/${id}`);
  return result;
};

export const updateCar = async (id, data) => {
  const result = await axiosInstance.put(`${API_URL_CAR}/${id}`, data);
  return result;
};

export const getRelate = async (category) => {
  const result = await axiosInstance.get(`${API_URL_CAR}/relate/${category}`);
  return result;
};

export const login = async (email, password) => {
  const userInfo = await axiosInstance.post(`${API_LOGIN}/login`, { email, password });
  return userInfo;
};
