/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Grid } from '@mui/material';
import React from 'react';
import MenuListItem from '../MenuListItem';
import styles from './index.module.sass';

function SideBar() {
  return (
    <Grid xs={2} className={styles.sidebar}>
      <MenuListItem />
      <Divider />
      <MenuListItem />
    </Grid>
  );
}

export default SideBar;
