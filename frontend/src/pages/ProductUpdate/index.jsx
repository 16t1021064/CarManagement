import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ImageSlide from './ImageSlide';
import styles from './index.module.sass';

function ProductUpdate() {
  const [currency, setCurrency] = useState('Car');
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const currencies = [
    {
      value: 'Car',
      label: 'Ô tô',
    },
    {
      value: 'Bike',
      label: 'Xe máy',
    },
    {
      value: 'Bicycle',
      label: 'Xe đạp',
    },
  ];
  return (
    <Grid xs={10} className={styles.productupdate}>
      <Box className={styles.productupdatefield}>
        <Grid xs={6} className={styles.productdetailupdate}>
          <Grid sx={12} class={styles.modaltitle}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Thông tin sản phẩm
            </Typography>
          </Grid>
          <Typography
            id="modal-modal-title"
            variant="body1"
            component="h2"
            sx={{ mt: 2, mb: 1 }}
          >
            Tên Sản Phẩm<span style={{ color: 'red' }}>*</span>
          </Typography>
          <FormControl sx={{ width: '95%' }}>
            <OutlinedInput
              placeholder="Nhập tên sản phẩm"
              size="small"
              value="Ferrari"
            />
          </FormControl>
          <Typography
            id="modal-modal-title"
            variant="body1"
            component="h2"
            sx={{ mt: 2, mb: 1 }}
          >
            Danh Mục Sản Phẩm<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            id="outlined-select-currency"
            select
            value={currency}
            onChange={handleChange}
            sx={{ width: '95%' }}
            label="--Chọn loại sản phẩm--"
            size="small"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Typography
            id="modal-modal-title"
            variant="body1"
            component="h2"
            sx={{ mt: 2, mb: 1 }}
          >
            Hãng Sản Xuất<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            id="outlined-select-currency"
            select
            label="--Chọn loại sản phẩm--"
            value={currency}
            onChange={handleChange}
            sx={{ width: '95%' }}
            size="small"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Typography
            id="modal-modal-title"
            variant="body1"
            component="h2"
            sx={{ mt: 2, mb: 1 }}
          >
            Giá<span style={{ color: 'red' }}>*</span>
          </Typography>
          <FormControl sx={{ width: '95%' }}>
            <OutlinedInput
              placeholder="Nhập giá sản phẩm"
              size="small"
              value="1000000"
            />
          </FormControl>
          <Typography
            id="modal-modal-title"
            variant="body1"
            component="h2"
            sx={{ mt: 2, mb: 1 }}
          >
            Mô tả
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={4}
            maxRows={4}
            placeholder="Nhập mô tả"
            value="123123123123"
            style={{ width: '95%', marginBottom: '30px' }}
          />
          <Grid xs={12} className={styles.buttonside}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                mr: 3,
                borderRadius: '15px',
                width: '164px',
              }}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              size="medium"
              sx={{
                borderRadius: '15px',
                width: '164px',
              }}
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
        <Grid xs={6} className={styles.productimageupdate}>
          <Grid xs={12} className={styles.productthumb}>
            <Box className={styles.productthumbtitle}>
              Ảnh minh hoạ<span style={{ color: 'red' }}>*</span>
            </Box>
            <Box className={styles.productthumbimage}>
              <img src="https://s1.cdn.autoevolution.com/images/news/ferrari-sp48-unica-officially-unveiled-it-s-a-one-off-in-a-crazy-shade-188107-7.jpg" alt="" />
              <Box className={styles.hoverthumb}>
                <Button variant="outlined" className={styles.hoverthumbbtn}>
                  Cập nhật
                </Button>
                <Button variant="outlined" className={styles.hoverthumbbtn}>
                  Xoá
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} className={styles.productslide}>
            <Box className={styles.productslidetitle}>
              Ảnh Slide
            </Box>
            <Box>
              <ul>
                <ImageSlide />
                <ImageSlide />
                <ImageSlide />
                <ImageSlide />
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default ProductUpdate;
