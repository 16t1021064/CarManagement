import { Grid } from '@mui/material';
import React from 'react';
import SearchBox from '../../components/SearchBox';
// eslint-disable-next-line import/no-cycle
import ProductTable from './components/ProductTable';
import styles from './index.module.sass';

function ProductListView() {
  return (
    <Grid xs={10} className={styles.manageproduct}>
      <Grid className={styles.tableheader} xs={12} item>
        <SearchBox />
      </Grid>
      <Grid xs={12} className={styles.producttable}>
        <ProductTable />
      </Grid>
    </Grid>
  );
}

export default ProductListView;
