/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import styles from './index.module.sass';
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle
import Paginator from '../../../../components/Paginator';
import ProductCard from '../ProductCardView';
import { getCar } from '../../../../api';
import image from '../../../../image/not-found.png';
import { OverLayContext } from '../../../../components/OverLay/provider';

export default function ProductTable() {
  const [carListView, setCarListView] = useState([]);
  const [totalCar, setTotalCar] = useState(0);
  const { setLoading } = useContext(OverLayContext);
  const location = useLocation();
  const { search } = location;
  const currentPage = new URLSearchParams(search).get('pageCurrent') || 1;
  const searchValue = new URLSearchParams(search).get('searchValue') || '';
  const supplier = new URLSearchParams(search).get('supplier') || '';
  const cate = new URLSearchParams(search).get('cate') || '';
  const getAll = async () => {
    setLoading(true);
    const carInfo = await getCar(currentPage, searchValue, supplier, cate);
    setLoading(false);
    const { carList, total } = carInfo;
    setCarListView(carList);
    setTotalCar(total);
  };
  useEffect(() => {
    getAll();
  }, []);
  useEffect(() => {
    getAll();
  }, [search]);
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
      <Grid xs={12} className={styles.gridtable}>
        <Grid xs={12} className={styles.listitem}>
          <ul className={styles.list} style={{ padding: 0 }}>
            {carListView?.map((car) => {
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
  };
  return renderTable();
}
