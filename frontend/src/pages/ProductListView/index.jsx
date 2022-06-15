import { Grid } from '@mui/material';
import React from 'react';
import SearchBox from '../../components/SearchBox';
import ProductTable from './components/ProductTable';
import styles from './index.module.scss';

function ProductListView() {
  return (
    <Grid xs={8} md={10} className={styles.manageproduct}>
      <Grid xs={12} className={styles.tableheader}>
        <SearchBox />
      </Grid>
      <Grid xs={12} className={styles.producttable}>
        <ProductTable />
      </Grid>
    </Grid>
  );
}

export default ProductListView;
