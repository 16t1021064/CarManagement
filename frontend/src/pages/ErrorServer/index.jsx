import { Grid } from '@mui/material';
import React from 'react';
import img from '../../image/error-server.png';

export default function ErrorServer() {
  return (
    <Grid xs={12}>
      <div style={{ width: '100%' }}>
        <img src={img} alt="" style={{ width: '100%' }} />
      </div>
    </Grid>
  );
}
