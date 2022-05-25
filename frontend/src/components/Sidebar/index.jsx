/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Grid } from '@mui/material';
import React from 'react';
// eslint-disable-next-line import/no-cycle
import MenuListCategory from '../MenuListCategory';
import MenuListSupplier from '../MenuListSupplier';
import styles from './index.module.sass';

function SideBar() {
  return (
    <Grid xs={2} className={styles.sidebar}>
      <MenuListCategory />
      <Divider />
      <MenuListSupplier />
    </Grid>
  );
}

export default SideBar;
