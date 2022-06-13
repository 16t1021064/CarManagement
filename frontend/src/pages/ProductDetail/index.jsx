/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-unreachable */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link, useHistory, useParams } from 'react-router-dom';
// eslint-disable-next-line import/named
import { getCarById } from '../../api';
import styles from './index.module.sass';
import ProductRelatedCard from './ProductRelatedCard';
import { formatPrice } from '../../helper/FormatPrice';
import useLoading from '../../hooks/useLoading';

function ProductDetail() {
  const [currentCar, setCurrentCar] = useState({});
  const [relateCar, setRelateCar] = useState([]);
  const [showLoading, hideLoading] = useLoading();
  const history = useHistory();
  const { id } = useParams();
  const getCar = async (carId) => {
    try {
      showLoading();
      if (!id) {
        history.push('/not-found');
      }
      const carDetail = await getCarById(carId);
      const { car, relate } = carDetail;
      setCurrentCar(car);
      setRelateCar(relate);
    } catch (error) {
      history.push('/server-error');
    } finally {
      hideLoading();
    }
  };
  useEffect(() => {
    getCar(id);
  }, [id]);
  const renderThumb = () => {
    if (currentCar) {
      return (
        <div key={currentCar.thumnail} className={styles.slide}>
          <img src={currentCar.thumnail} alt="" className={styles.slideImg} />
        </div>
      );
    }
  };
  const renderGallery = () => {
    const result = currentCar.gallery?.filter((item) => item !== '');
    const html = result?.map((item) => (
      <div key={item} className={styles.slide}>
        <img src={item} alt={item} className={styles.slideImg} />
      </div>
    ));
    return html;
  };

  return (
    <Grid
      xs={9}
      md={10}
      className={styles.productdetail}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '30px',
        height: 'auto',
      }}
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
            <Link to="/danh-sach-sp" style={{ textDecoration: 'none' }}>
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
            </Link>
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
                    Tên sản phẩm: {currentCar.name?.toUpperCase()}
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
                    Giá Sản Phẩm: { isNaN(formatPrice(parseInt(currentCar.cost, 10))) ? formatPrice(parseInt(currentCar.cost, 10)) : ''}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Typography variant="body1" gutterBottom sx={{ mb: 1 }}>
                    Mô Tả Sản Phẩm:
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
                    infiniteLoop
                    autoPlay
                  >
                    {
                      renderThumb()
                    }
                    {
                      renderGallery()
                    }
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
              {
                relateCar?.map((car) => <ProductRelatedCard car={car} key={car.id} />)
              }
            </ul>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}

export default ProductDetail;
