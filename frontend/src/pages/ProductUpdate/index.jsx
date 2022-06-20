/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
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
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getCarById,
  getRelate,
  updateCar,
} from '../../api';
import AddModalSuccess from '../ManageProduct/components/AddModalSuccess';
import AddImageSlide from './AddImageSlide';
import styles from './index.module.sass';
import useLoading from '../../hooks/useLoading';
import useModal from '../../hooks/useModal';

const schema = yup.object().shape({
  // thumnail: yup
  //   .mixed()
  //   .test('required', 'Vui lòng chọn ảnh đại diện', (value) => value && value.length)
  //   .test('type', 'Vui lòng nhập file đúng định dạng JPEG, JPG, PNG', (value) => {
  //     console.log(value);
  //     (value[0]?.type === 'image/jpeg' || value[0]?.type === 'image/jpg' || value[0]?.type === 'image/png');
  //   }),
  name: yup
    .string()
    .required('Vui lòng nhập tên')
    .test('minLength', 'Tên xe lớn hơn 3 ký tự', (val) => val.length > 3)
    .test('maxLength', 'Tên xe bé hơn 20 ký tự', (val) => val.length < 20),
  category: yup
    .string()
    .required('Vui lòng chọn loại xe'),
  supplier: yup
    .string()
    .required('Vui lòng chọn nhà cung cấp'),
  cost: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Vui lòng nhập giá')
    .test('min', 'Giá phải lớn hơn 0', (val) => val > 0),
});

function ProductUpdate() {
  const [category, setCategory] = useState('');
  const [supplier, setSupplier] = useState('');
  const [list, setList] = useState({
    categories: [],
    suppliers: [],
  });
  const [currentCate, setCurrentCate] = useState('');
  const [carCurrent, setCarCurrent] = useState({});
  const [selectedThumnail, setSelectedThumnail] = useState();
  const [preview, setPreview] = useState();
  const [galleryStr, setGalleryStr] = useState([]);
  const [galleryFile, setGalleryFile] = useState([undefined, undefined, undefined, undefined]);
  const [openModalUpdateSuccess, setOpenModalUpdateSuccess] = useState(false);
  const [showLoading, hideLoading] = useLoading();
  const [showModal] = useModal();
  const history = useHistory();
  const routerChange = () => {
    const path = '/quan-ly-sp';
    history.push(path);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    setCurrentCate(event.target.value);
  };
  const handleChangeSupplier = (event) => {
    setSupplier(event.target.value);
  };

  const getList = async (categoryCur) => {
    try {
      let result;
      if (categoryCur === 'Tất cả' || categoryCur === '') {
        result = await getRelate('*');
      } else {
        result = await getRelate(categoryCur);
      }
      setList(result);
    } catch (error) {
      history.push('/server-error');
    }
  };
  // eslint-disable-next-line new-cap
  const { id } = useParams();
  const getCarCurrent = async () => {
    try {
      showLoading();
      if (!id) {
        history.push('/not-found');
      }
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
    } catch (error) {
      history.push('/server-error');
    } finally {
      hideLoading();
    }
  };
  useEffect(() => {
    getCarCurrent();
  }, []);
  useEffect(() => {
    getList(currentCate);
  }, [currentCate]);
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
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('supplier', data.supplier);
    formData.append('category', data.category);
    formData.append('cost', data.cost);
    formData.append('description', data.description);
    formData.append('thumnail', selectedThumnail);
    for (let i = 0; i < galleryStr.length; i += 1) {
      formData.append('galleryString', galleryStr[i]);
    }
    for (let i = 0; i < galleryFile.length; i += 1) {
      if (galleryFile[i]) {
        formData.append('galleryCheck', 'exist');
      } else {
        formData.append('galleryCheck', 'not exist');
      }
    }
    for (let i = 0; i < galleryFile.length; i += 1) {
      formData.append('gallery', galleryFile[i]);
    }
    const result = await updateCar(id, formData);
    if (result) {
      showModal('Cập nhật sản phẩm thành công!');
    }
    if (!result) {
      history.push('/server-error');
    }
  };
  const renderThumb = () => {
    if (selectedThumnail) {
      return <img src={preview} alt="" />;
    }
    return <img src={carCurrent.thumnail} alt="" />;
  };
  return (
    <Grid xs={9} md={10} className={styles.productupdate}>
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
                helperText={errors.name?.message}
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
                {list.categories.map((option) => (
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
                {list.suppliers.map((option) => (
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
                helperText={errors.cost?.message}
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
                onClick={routerChange}
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
                Lưu
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
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    {...register('thumnail')}
                    accept="image/*"
                    onChange={onSelectFile}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="outlined" className={styles.hoverthumbbtn} component="span">
                      Cập nhật
                    </Button>
                  </label>
                </Box>
              </Box>
              { errors.thumnail?.message && <span className={styles.errormessage}>{errors.thumnail?.message}</span>}
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
        {openModalUpdateSuccess && <AddModalSuccess setOpenModalUpdateSuccess={setOpenModalUpdateSuccess} message="Cập nhật sản phẩm thành công !!!" />}
      </form>
    </Grid>
  );
}

export default ProductUpdate;
