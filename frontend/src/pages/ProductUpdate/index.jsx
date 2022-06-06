/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { getAllCategory, getAllSupplier, getCarById } from '../../api';
import AddImageSlide from './AddImageSlide';
import styles from './index.module.sass';

function ProductUpdate() {
  const [category, setCategory] = useState('');
  const [supplier, setSupplier] = useState('');
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [carCurrent, setCarCurrent] = useState({});
  const [selectedThumnail, setSelectedThumnail] = useState();
  const [preview, setPreview] = useState();
  const [galleryStr, setGalleryStr] = useState([]);
  const [galleryFile, setGalleryFile] = useState([undefined, undefined, undefined, undefined]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { search } = useLocation();
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeSupplier = (event) => {
    setSupplier(event.target.value);
  };

  const getCategories = async () => {
    const cate = await getAllCategory();
    setCategories(cate);
  };
  const getSuppliers = async () => {
    const sup = await getAllSupplier();
    setSuppliers(sup);
  };
  const id = new URLSearchParams(search).get('id') || '';
  const getCarCurrent = async () => {
    const { car } = await getCarById(id);
    setCarCurrent(car);
    reset({
      name: car.name,
      cost: car.cost,
      description: car.description,
      supplier: car.supplier,
      category: car.category,
    });
    setGalleryStr(car.gallery);
    setCategory(car.category);
    setSupplier(car.supplier);
  };
  useEffect(() => {
    getSuppliers();
    getCategories();
  }, []);
  useEffect(() => {
    getCarCurrent();
  }, [search]);
  useEffect(() => {
    if (!selectedThumnail) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedThumnail);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedThumnail]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedThumnail(undefined);
      return;
    }
    setSelectedThumnail(e.target.files[0]);
  };
  const onSubmit = (data) => {
    console.log(data);
    console.log(selectedThumnail);
    console.log(galleryStr);
    console.log(galleryFile);
    // const formData = new FormData();
    // formData.append('name', data.name);
    // formData.append('supplier', data.supplier);
    // formData.append('category', data.category);
    // formData.append('cost', data.cost);
    // formData.append('description', data.description);
    // formData.append('thumnail', selectedThumnail);
  };
  const renderThumb = () => {
    if (selectedThumnail) {
      return <img src={preview} alt="" />;
    }
    return <img src={carCurrent.thumnail} alt="" />;
  };
  return (
    <Grid xs={10} className={styles.productupdate}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.productupdatefield}>
          <Grid xs={6} className={styles.productdetailupdate}>
            <Grid xs={12} className={styles.modaltitle}>
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
              <TextField
                placeholder="Nhập tên sản phẩm"
                size="small"
                error={!!errors.name}
                helperText={errors.name ? 'Vui lòng nhập tên sản phẩm' : ''}
                {...register('name', { required: true })}
                onBlurCapture={(e) => { e.target.value = e.target.value.trim(); }}
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
            <FormControl fullWidth>
              <InputLabel id="label-category" size="small">--Chọn loại sản phẩm--</InputLabel>
              <Select
                labelId="label-category"
                id="demo-simple-select"
                value={category}
                label="--Chọn loại sản phẩm--"
                defaultValue={carCurrent.category}
                error={!!errors.category}
                size="small"
                sx={{ width: '95%' }}
                {...register('category')}
                onChange={handleChangeCategory}
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography
              id="modal-modal-title"
              variant="body1"
              component="h2"
              sx={{ mt: 2, mb: 1 }}
            >
              Hãng Sản Xuất<span style={{ color: 'red' }}>*</span>
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="label-supplier" size="small">--Chọn nhà cung cấp--</InputLabel>
              <Select
                labelId="label-supplier"
                label="--Chọn nhà cung cấp--"
                value={supplier}
                sx={{ width: '95%' }}
                size="small"
                {...register('supplier')}
                onChange={handleChangeSupplier}
              >
                {suppliers.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography
              id="modal-modal-title"
              variant="body1"
              component="h2"
              sx={{ mt: 2, mb: 1 }}
            >
              Giá<span style={{ color: 'red' }}>*</span>
            </Typography>
            <FormControl sx={{ width: '95%' }}>
              <TextField
                placeholder="Nhập giá sản phẩm"
                size="small"
                type="number"
                error={!!errors.cost}
                helperText={errors.cost?.type === 'min' ? 'Giá sản phẩm phải lớn hơn 0' : errors.cost?.type === 'required' ? 'Vui lòng nhập giá sản phẩm' : ''}
                {...register('cost', { required: true, min: 0 })}
                onBlurCapture={(e) => { e.target.value = e.target.value.trim(); }}
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
              {...register('description')}
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
                type="submit"
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
                {
                  renderThumb()
                }
                <Box className={styles.hoverthumb}>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    onChange={onSelectFile}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="outlined" className={styles.hoverthumbbtn} component="span">
                      Cập nhật
                    </Button>
                  </label>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} className={styles.productslide}>
              <Box className={styles.productslidetitle}>
                Ảnh Slide
              </Box>
              <Box>
                <ul>
                  {carCurrent.gallery?.map((item, index) => (
                    <AddImageSlide
                      key={+index}
                      num={index}
                      item={item}
                      galleryStr={galleryStr}
                      galleryFile={galleryFile}
                      setGalleryStr={setGalleryStr}
                      setGalleryFile={setGalleryFile}
                    />
                  ))}
                </ul>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Grid>
  );
}

export default ProductUpdate;
