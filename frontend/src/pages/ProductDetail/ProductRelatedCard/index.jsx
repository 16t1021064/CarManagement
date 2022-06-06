/* eslint-disable react/prop-types */
import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../helper/FormatPrice';
import styles from './index.module.sass';

function ProductRelatedCard({ car }) {
  return (
    <Grid xs={4} className={styles.item}>
      <li>
        <div className={styles.borderitem}>
          <Link to={`/chi-tiet-sp?id=${car?.id}`}>
            <div className={styles.imgarea}>
              <img src={car.thumnail} alt="img" />
            </div>
          </Link>
          <div className={styles.productname}>{car?.name}</div>
          <div className={styles.productprice}>{formatPrice(car?.cost)}</div>
        </div>
      </li>
    </Grid>
  );
}

export default ProductRelatedCard;
