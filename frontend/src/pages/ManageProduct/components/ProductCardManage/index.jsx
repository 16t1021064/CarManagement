/* eslint-disable react/prop-types */
import { Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import styles from './index.module.sass';

function ProductCardManage({ car, setResetCar }) {
  const history = useHistory();
  const handleUpdate = useCallback(() => history.push(`/cap-nhat-sp/${car.id}`), [history]);
  return (
    <Grid md={4} xs={6} className={styles.item}>
      <li>
        <div className={styles.borderitem}>
          <Link to={`/chi-tiet-sp/${car.id}`}>
            <div className={styles.imgarea}>
              <img src={car.thumnail} alt="img" />
            </div>
          </Link>
          <div className={styles.productname}>{car.name}</div>
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
            <ConfirmDeleteModal carName={car.name} carId={car.id} setResetCar={setResetCar} />
          </div>
        </div>
      </li>
    </Grid>
  );
}

export default ProductCardManage;
