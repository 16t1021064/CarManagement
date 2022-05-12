import { Grid } from '@mui/material';
import React from 'react';
import styles from './index.module.sass';

function ProductCardManage() {
  return (
    <Grid xs={4} className={styles.item}>
      <li>
        <div className={styles.borderitem}>
          <img src="https://dummyimage.com/227x140/000/fff" alt="img" />
          <div className={styles.productname}>Ferarri</div>
          <div className={styles.productprice}>$1.000.000</div>
        </div>
      </li>
    </Grid>
  );
}

export default ProductCardManage;
