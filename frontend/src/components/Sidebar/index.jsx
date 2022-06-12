/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getAllCategory, getAllSupplier } from '../../api';
// // eslint-disable-next-line import/no-cycle
import MenuListItem from '../MenuListItem';
import styles from './index.module.sass';

function SideBar() {
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const getSupplierList = async () => {
    try {
      const supplierList = await getAllSupplier();
      setSuppliers(supplierList);
    } catch (error) {
      history.push('/server-error');
    }
  };
  const getCategoryList = async () => {
    try {
      const categoryList = await getAllCategory();
      setCategories(categoryList);
    } catch (error) {
      history.push('/server-error');
    }
  };
  useEffect(() => {
    getSupplierList();
    getCategoryList();
  }, []);
  const renderSidebar = () => {
    if (location.pathname.includes('/not-found') || location.pathname.includes('/server-error')) {
      return <></>;
    }
    return (
      <Grid xs={2} className={styles.sidebar} item>
        <MenuListItem incomeList={categories} cate="cate" header="Danh Mục" />
        <Divider />
        <MenuListItem incomeList={suppliers} cate="supplier" header="Nhà Cung Cấp" />
      </Grid>
    );
  };
  return renderSidebar();
}

export default SideBar;
