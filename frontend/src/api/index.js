/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
import axiosInstance from './axios';

const API_URL = 'http://localhost:5001/v1/cars';

export const getCar = async (currentPage, searchValue, supplier, cate) => {
  if (supplier === 'Tất cả') {
    // eslint-disable-next-line no-param-reassign
    supplier = '';
  }
  if (cate === 'Tất cả') {
    // eslint-disable-next-line no-param-reassign
    cate = '';
  }
  const pageLimit = 3;
  const carInfo = await axiosInstance.get(`${API_URL}/?pageCurrent=${currentPage}&pageLimit=${pageLimit}&searchValue=${searchValue}&supplier=${supplier}&category=${cate}`);
  return carInfo;
};

export const getCarById = async (id) => {
  const carInfo = await axiosInstance.get(`${API_URL}/${id}`);
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
