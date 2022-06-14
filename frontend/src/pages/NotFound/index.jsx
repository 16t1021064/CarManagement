import { Grid } from '@mui/material';
import React from 'react';
import img from '../../image/404.png';

export default function NotFound() {
  return (
    <Grid xs={12}>
      <div style={{ textAlign: 'center' }}>
        <img src={img} alt="" />
      </div>
    </Grid>
  );
}
