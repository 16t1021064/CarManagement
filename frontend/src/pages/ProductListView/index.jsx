import { Grid } from '@mui/material';
import React from 'react';
import SearchBox from '../../components/SearchBox';
import ProductTable from './components/ProductTable';
import styles from './index.module.sass';

function ProductListView() {
  return (
    <Grid xs={10} className={styles.manageproduct}>
      <Grid className={styles.tableheader} xs={12}>
        <SearchBox />
      </Grid>
      <Grid xs={12} className={styles.producttable}>
        <ProductTable />
      </Grid>
    </Grid>
  );
}

export default ProductListView;
