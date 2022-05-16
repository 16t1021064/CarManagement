import { Grid, Box, Button } from '@mui/material';
import React from 'react';
import styles from './index.module.sass';

export default function ImageSlide() {
  return (
    <Grid xs={5} className={styles.imgslideframe}>
      <Box className={styles.imgslidetitle}>Ảnh 1</Box>
      <Box className={styles.imgslide}>
        <img
          src="https://s1.cdn.autoevolution.com/images/news/ferrari-sp48-unica-officially-unveiled-it-s-a-one-off-in-a-crazy-shade-188107-7.jpg"
          alt=""
        />
        <Box className={styles.hoverimageslide}>
          <Button variant="outlined" className={styles.hoverslidebtn}>
            Cập nhật
          </Button>
          <Button variant="outlined" className={styles.hoverslidebtn}>
            Xoá
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
