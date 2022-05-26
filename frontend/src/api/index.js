/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import axiosInstance from './axios';

const API_URL = 'http://localhost:5001/v1/cars';

export const getCar = async (currentPage) => {
  const pageLimit = 3;
  const carInfo = await axiosInstance.get(`${API_URL}/pageCurrent=${currentPage}&pageLimit=${pageLimit}`);
  return carInfo;
};

export const getAllCategory = async () => {
  const categoryList = await axiosInstance.get(`${API_URL}/category`);
  return categoryList;
};

export const getAllSupplier = async () => {
  const supplierList = await axiosInstance.get(`${API_URL}/supplier`);
  return supplierList;
};

export const getTotalCar = async () => {
  const totalCar = await axiosInstance.get(`${API_URL}/total`);
  return totalCar;
};
