/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import styles from './index.module.sass';
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle
import Paginator from '../../../../components/Paginator';
import ProductCard from '../ProductCardView';
import { getCar } from '../../../../api';

export default function ProductTable() {
  const [carListView, setCarListView] = useState([]);
  const [totalCar, setTotalCar] = useState();
  const { search } = useLocation();
  const currentPage = new URLSearchParams(search).get('pageCurrent') || 1;
  const getAll = async () => {
    const carInfo = await getCar(currentPage);
    const { carList, total } = carInfo;
    setCarListView(carList);
    setTotalCar(total);
  };
  useEffect(() => {
    getAll();
  }, [currentPage]);
  return (
    <Grid className={styles.gridtable}>
      <Grid xs={12} className={styles.listitem}>
        <ul className={styles.list} style={{ padding: 0 }}>
          {carListView.map((car) => {
            return (
              <ProductCard car={car} key={car.id} />
            );
          })}
        </ul>
      </Grid>
      <Grid xs={12} className={styles.paginator}>
        <Paginator totalCar={totalCar} />
      </Grid>
    </Grid>
  );
}
