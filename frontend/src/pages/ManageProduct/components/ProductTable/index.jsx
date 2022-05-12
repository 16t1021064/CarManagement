import React from 'react';
import { Grid } from '@mui/material';
import styles from './index.module.sass';
import ProductCardManage from '../ProductCardManage';
import Paginator from '../../../../components/Paginator';

export default function ProductTable() {
  return (
    <Grid className={styles.gridtable}>
      <Grid xs={12} className={styles.listitem}>
        <ul className={styles.list}>
          <ProductCardManage />
          <ProductCardManage />
          <ProductCardManage />
          <ProductCardManage />
          <ProductCardManage />
          <ProductCardManage />
        </ul>
      </Grid>
      <Grid xs={12} className={styles.paginator}>
        <Paginator />
      </Grid>
    </Grid>
  );
}
