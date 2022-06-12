/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Grid } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
// // eslint-disable-next-line import/no-cycle
import MenuListCategory from '../MenuListCategory';
import MenuListSupplier from '../MenuListSupplier';
import styles from './index.module.sass';

function SideBar() {
  const location = useLocation();
  const renderSidebar = () => {
    if (location.pathname.includes('/not-found') || location.pathname.includes('/server-error')) {
      return <></>;
    }
    return (
      <Grid xs={2} className={styles.sidebar} item>
        <MenuListCategory />
        <Divider />
        <MenuListSupplier />
      </Grid>
    );
  };
  return renderSidebar();
}

export default SideBar;
