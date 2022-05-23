/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import axiosInstance from './axios';

const API_URL = 'http://localhost:5001/v1/cars';

export const getAllCar = async () => {
  const carList = await axiosInstance.get(`${API_URL}`);
  return carList;
};

export const getAllCategory = async () => {
  const categoryList = await axiosInstance.get(`${API_URL}/category`);
  return categoryList;
};

export const getAllSupplier = async () => {
  const supplierList = await axiosInstance.get(`${API_URL}/supplier`);
  return supplierList;
};
