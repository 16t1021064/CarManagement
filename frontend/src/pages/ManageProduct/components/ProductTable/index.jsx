/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import styles from './index.module.sass';
import ProductCardManage from '../ProductCardManage';
import Paginator from '../../../../components/Paginator';
import { getCar } from '../../../../api';
import image from '../../../../image/not-found.png';

export default function ProductTable({ resetCar, setAddSuccessStatus, setResetCar }) {
  const [carListUpdate, setCarListUpdate] = useState([]);
  const [totalCar, setTotalCar] = useState();
  const { search } = useLocation();
  const currentPage = new URLSearchParams(search).get('pageCurrent') || 1;
  const searchValue = new URLSearchParams(search).get('searchValue') || '';
  const supplier = new URLSearchParams(search).get('supplier') || '';
  const cate = new URLSearchParams(search).get('cate') || '';
  const getAll = async () => {
    const carInfo = await getCar(currentPage, searchValue, supplier, cate);
    const { carList, total } = carInfo;
    await setTotalCar(total);
    await setCarListUpdate(carList);
  };
  useEffect(() => {
    getAll();
  }, []);
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
    if (totalCar === 0) {
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
            {carListUpdate.map((car) => {
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
