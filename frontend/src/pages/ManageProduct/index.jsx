import { Grid } from '@mui/material';
import React, { useState } from 'react';
import SearchBox from '../../components/SearchBox';
import ProductTable from './components/ProductTable';
import styles from './index.module.scss';
import AddModal from './components/AddModal';
import AddModalSuccess from './components/AddModalSuccess';

function ManageProduct() {
  const [addSuccessStatus, setAddSuccessStatus] = useState(false);
  const [resetCar, setResetCar] = useState(false);
  return (
    <Grid xs={9} md={10} className={styles.manageproduct}>
      <Grid className={styles.tableheader} xs={12}>
        <AddModal
          setAddSuccessStatus={setAddSuccessStatus}
          setResetCar={setResetCar}
        />
        <AddModalSuccess openAddSuccess={addSuccessStatus} message="Thêm sản phẩm thành công!" />
        <SearchBox />
      </Grid>
      <Grid xs={12} className={styles.producttable}>
        <ProductTable
          resetCar={resetCar}
          setAddSuccessStatus={setAddSuccessStatus}
          setResetCar={setResetCar}
        />
      </Grid>
    </Grid>
  );
}

export default ManageProduct;
