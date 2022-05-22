/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import styles from './index.module.sass';
// eslint-disable-next-line import/no-cycle
import { AppContext } from '../../../../App';
import Paginator from '../../../../components/Paginator';
import ProductCard from '../ProductCardView';

export default function ProductTable() {
  const { cars } = useContext(AppContext);
  return (
    <Grid className={styles.gridtable}>
      <Grid xs={12} className={styles.listitem}>
        <ul className={styles.list} style={{ padding: 0 }}>
          {cars.map((car) => {
            return (
              <ProductCard car={car} key={car.id} />
            );
          })}
        </ul>
      </Grid>
      <Grid xs={12} className={styles.paginator}>
        <Paginator />
      </Grid>
    </Grid>
  );
}
