/* eslint-disable jsx-a11y/anchor-is-valid */
import { Grid } from '@mui/material';
import React from 'react';
import styles from './index.module.sass';

function SideBar() {
  return (
    <Grid xs={2} className={styles.sidebar}>
      Sidebar
    </Grid>
  );
}

export default SideBar;
