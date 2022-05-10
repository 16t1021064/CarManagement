import React from 'react';
import { Grid } from '@mui/material';
import styles from './index.module.sass';
import Paginator from '../../../../components/Paginator';
import ProductCard from '../../../../components/ProductCard';

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//     author: '@tjdragotta',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//     author: '@katie_wasserman',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//     author: '@silverdalex',
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//     author: '@shelleypauls',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//     author: '@peterlaster',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//     author: '@southside_customs',
//     cols: 2,
//   },
// ];

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
