import React from 'react';
import { Grid } from '@mui/material';
import styles from './index.module.sass';
import Paginator from '../Paginator';
import ProductCard from '../../pages/ManageProduct/components/ProductCardManage';

export default function ProductTable() {
  return (
    <Grid className={styles.gridtable}>
      <Grid xs={12} className={styles.listitem}>
        <ul className={styles.list}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ul>
      </Grid>
      <Grid xs={12} className={styles.paginator}>
        <Paginator />
      </Grid>
    </Grid>
  );
}
