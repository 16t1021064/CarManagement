import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.sass';

function ProductCardManage() {
  return (
    <Grid xs={4} className={styles.item}>
      <li>
        <div className={styles.borderitem}>
          <Link to="/chi-tiet-sp">
            <img src="https://s1.cdn.autoevolution.com/images/news/ferrari-sp48-unica-officially-unveiled-it-s-a-one-off-in-a-crazy-shade-188107-7.jpg" alt="img" />
          </Link>
          <div className={styles.productname}>Ferarri</div>
          <div className={styles.productprice}>$1.000.000</div>
        </div>
      </li>
    </Grid>
  );
}

export default ProductCardManage;
