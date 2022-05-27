import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';
// eslint-disable-next-line import/named
import { getCarById } from '../../api';
import styles from './index.module.sass';
import ProductRelatedCard from './ProductRelatedCard';
import { formatPrice } from '../../helper/FormatPrice';

function ProductDetail() {
  const [currentCar, setCurrentCar] = useState();
  const { search } = useLocation();
  const id = new URLSearchParams(search).get('id') || 1;
  const getCar = async (carId) => {
    const car = await getCarById(carId);
    setCurrentCar(car);
  };
  useEffect(() => {
    getCar(id);
  }, [id]);
  return (
    <Grid
      xs={10}
      className={styles.productdetail}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        sx={{
          background: '#fff',
          width: '90%',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '90%',
            height: '90%',
          }}
        >
          <Grid xs={12} className="headerproductdetail">
            <Box
              sx={{
                background: '#fff',
                width: '80%',
                height: '80%',
                borderRadius: '20px',
                display: 'flex',
                color: '#00ADE8',
                mb: 2,
                mt: 2,
              }}
            >
              <ArrowBackIcon />
              <Typography variant="subtitle1" gutterBottom component="div">
                Quay lại
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box
              sx={{
                display: 'flex',
                height: '316px',
                mb: 2,
              }}
            >
              <Grid xs={5}>
                <Grid xs={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{ mb: 2 }}
                  >
                    {currentCar.name}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="body1" gutterBottom sx={{ mb: 1 }}>
                    Danh Mục: {currentCar.category}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="body1" gutterBottom sx={{ mb: 1 }}>
                    Hãng Sản Xuất: {currentCar.supplier}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="body1" gutterBottom sx={{ mb: 1 }}>
                    Giá Sản Phẩm: {formatPrice(currentCar.cost)}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="body1" gutterBottom sx={{ mb: 1 }}>
                    Mô Tả Sản PHẩm:
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="body2" gutterBottom sx={{ mb: 1 }}>
                    {currentCar.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid xs={7}>
                <Box sx={{ ml: 2 }}>
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    showArrows={false}
                    interval={3000}
                    autoPlay
                    infiniteLoop
                    centerSlidePercentage={3}
                  >
                    <div>
                      <img src="https://dummyimage.com/1000x2000/000/fff" alt="slider1" className={styles.slideImg} />
                    </div>
                    <div>
                      <img src="https://dummyimage.com/1000x2000/000/fff" alt="slider1" className={styles.slideImg} />
                    </div>
                    <div>
                      <img src="https://dummyimage.com/1000x2000/000/fff" alt="slider1" className={styles.slideImg} />
                    </div>
                    <div>
                      <img src="https://dummyimage.com/1000x2000/000/fff" alt="slider1" className={styles.slideImg} />
                    </div>
                    <div>
                      <img src="https://dummyimage.com/1000x2000/000/fff" alt="slider1" className={styles.slideImg} />
                    </div>
                  </Carousel>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={12} className={styles.suggetion}>
            Gợi Ý Cho Bạn:
          </Grid>
          <Grid xs={12} sx={{ margin: '0px -16px' }}>
            <ul style={{ listStyle: 'none', display: 'flex', padding: '0px' }}>
              <ProductRelatedCard />
              <ProductRelatedCard />
              <ProductRelatedCard />
            </ul>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}

export default ProductDetail;
