/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import styles from './index.module.sass';
import ProductCardManage from '../ProductCardManage';
import Paginator from '../../../../components/Paginator';
import { getCar } from '../../../../api';
import image from '../../../../image/not-found.png';
import { OverLayContext } from '../../../../components/OverLay/provider';

export default function ProductTable({ resetCar, setAddSuccessStatus, setResetCar }) {
  const [carListUpdate, setCarListUpdate] = useState([]);
  const [totalCar, setTotalCar] = useState();
  // const [searchInfo, setSearchInfo] = useState({
  //   currentPage: 1,
  //   searchValue: '',
  //   supplier: '',
  //   cate: '',
  // });
  const { search } = useLocation();
  const history = useHistory();
  const { setLoading } = useContext(OverLayContext);
  const currentPage = new URLSearchParams(search).get('pageCurrent') || 1;
  const searchValue = new URLSearchParams(search).get('searchValue') || '';
  const supplier = new URLSearchParams(search).get('supplier') || '';
  const cate = new URLSearchParams(search).get('cate') || '';
  const getAll = async () => {
    try {
      setLoading(true);
      const carInfo = await getCar(currentPage, searchValue, supplier, cate);
      const { carList, total } = carInfo;
      setTotalCar(total);
      setCarListUpdate(carList);
    } catch (error) {
      history.push('/server-error');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAll();
  }, [search]);
  useEffect(() => {
    if (resetCar) {
      getAll();
      setAddSuccessStatus(false);
      setResetCar(false);
    }
  }, [resetCar]);
  const renderTable = () => {
    if (totalCar === 0 && !totalCar) {
      return (
        <Grid className={styles.gridtable}>
          <Box className={styles.notfound}>
            <img alt="" src={image} className={styles.img} />
          </Box>
        </Grid>
      );
    }
    return (
      <Grid className={styles.gridtable}>
        <Grid xs={12} className={styles.listitem}>
          <ul className={styles.list} style={{ padding: 0 }}>
            {carListUpdate?.map((car) => {
              return (
                <ProductCardManage car={car} setResetCar={setResetCar} key={car.id} />
              );
            })}
          </ul>
        </Grid>
        <Grid xs={12} className={styles.paginator}>
          <Paginator totalCar={totalCar} />
        </Grid>
      </Grid>
    );
  };
  return renderTable();
}
