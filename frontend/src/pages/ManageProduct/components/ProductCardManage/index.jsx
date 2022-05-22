import { Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import img from '../../../../image/Mazda.jpeg';
import styles from './index.module.sass';

function ProductCardManage() {
  const history = useHistory();
  const handleUpdate = useCallback(() => history.push('/cap-nhat-sp'), [history]);
  return (
    <Grid xs={4} className={styles.item}>
      <li>
        <div className={styles.borderitem}>
          <Link to="/chi-tiet-sp">
            <img src={img} alt="img" />
          </Link>
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
              onClick={handleUpdate}
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
              Xoá
            </Button>
          </div>
        </div>
      </li>
    </Grid>
  );
}

export default ProductCardManage;
