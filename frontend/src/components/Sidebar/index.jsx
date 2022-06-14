/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getRelate } from '../../api';
// // eslint-disable-next-line import/no-cycle
import MenuListItem from '../MenuListItem';
import styles from './index.module.sass';

function SideBar() {
  const [list, setList] = useState({
    categories: [],
    suppliers: [],
  });
  const [currentCate, setCurrentCate] = useState('');
  const location = useLocation();
  const history = useHistory();
  const getList = async (category) => {
    try {
      let result;
      if (category === 'Tất cả' || category === '') {
        result = await getRelate('*');
      } else {
        result = await getRelate(category);
      }
      setList(result);
    } catch (error) {
      history.push('/server-error');
    }
  };
  const renderSidebar = () => {
    useEffect(() => {
      getList(currentCate);
    }, [currentCate]);
    if (location.pathname.includes('/not-found') || location.pathname.includes('/server-error')) {
      return <></>;
    }
    return (
      <Grid xs={3} md={2} className={styles.sidebar} item>
        <MenuListItem incomeList={list.categories} cate="cate" header="Danh Mục" setCurrentCate={setCurrentCate} />
        <Divider />
        <MenuListItem incomeList={list.suppliers} cate="supplier" header="Nhà Cung Cấp" />
      </Grid>
    );
  };
  return renderSidebar();
}

export default SideBar;
