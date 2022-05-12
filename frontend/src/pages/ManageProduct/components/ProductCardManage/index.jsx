import { Button, Grid } from '@mui/material';
import React from 'react';
import styles from './index.module.sass';

function ProductCardManage() {
  return (
    <Grid xs={4} className={styles.item}>
      <li>
        <div className={styles.borderitem}>
          <img src="https://dummyimage.com/227x140/000/fff" alt="img" />
          <div className={styles.productname}>Ferarri</div>
          <div className={styles.productbutton}>
            <Button
              variant="contained"
              size="small"
              sx={{
                mt: 1,
                width: '94px',
                background: '#6ECB63',
                textTransform: 'none',
              }}
            >
              Cập nhật
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                mt: 1,
                width: '94px',
                background: 'red',
                textTransform: 'none',
              }}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </li>
    </Grid>
  );
}

export default ProductCardManage;
