/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Grid } from '@mui/material';
import React, { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { AppContext } from '../../App';
import MenuListCategory from '../MenuListCategory';
import MenuListSupplier from '../MenuListSupplier';
import styles from './index.module.sass';

function SideBar() {
  const { categories, suppliers } = useContext(AppContext);
  return (
    <Grid xs={2} className={styles.sidebar}>
      <MenuListCategory categories={categories} />
      <Divider />
      <MenuListSupplier suppliers={suppliers} />
    </Grid>
  );
}

export default SideBar;
