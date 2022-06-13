/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Divider,
  FormControl,
  Grid,
  MenuItem,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Modal from '@mui/material/Modal';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useForm } from 'react-hook-form';
import styles from './index.module.sass';
import { createCar, getAllCategory, getAllSupplier } from '../../../../api';

export default function AddModal({ setAddSuccessStatus, setResetCar }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [supplier, setSupplier] = useState('');
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const history = useHistory();
  const initialCate = async () => {
    const cate = await getAllCategory();
    setCategories(cate);
  };
  const initialSup = async () => {
    const sup = await getAllSupplier();
    setSuppliers(sup);
  };
  useEffect(() => {
    initialCate();
    initialSup();
  }, []);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeSupplier = (event) => {
    setSupplier(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('supplier', data.supplier);
    formData.append('category', data.category);
    formData.append('cost', data.cost);
    formData.append('description', data.description);
    formData.append('thumnail', data.thumnail[0]);
    await createCar(formData);
    handleClose(true);
    setAddSuccessStatus(true);
    setResetCar(true);
    reset({});
    setCategory('');
    setSupplier('');
    history.push({ search: `${queryString.stringify({})}` });
  };
  return (
    <>
      <Button onClick={handleOpen} className={styles.addmodalbutton}>
        Thêm Sản Phẩm
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid xs={12} className={styles.modaltitle}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Thêm sản phẩm
            </Typography>
            <CancelRoundedIcon styles={{ float: 'right' }} onClick={handleClose} sx={{ cursor: 'pointer' }} />
          </Grid>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              id="modal-modal-title"
              variant="body1"
              component="h2"
              sx={{ mt: 2, mb: 1 }}
            >
              Tên Sản Phẩm<span style={{ color: 'red' }}>*</span>
            </Typography>
            <FormControl sx={{ width: '100%' }}>
              <TextField
                placeholder="Nhập tên sản phẩm"
                size="small"
                name="name"
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
            <TextField
              id="outlined-select-currency"
              select
              value={category}
              sx={{ width: '100%' }}
              label="--Chọn loại sản phẩm--"
              size="small"
              name="category"
              error={!!errors.category && !category}
              helperText={!category && errors.category ? 'Vui lòng chọn loại sản phẩm' : ''}
              {...register('category', { required: true })}
              onChange={handleChangeCategory}
            >
              {categories?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
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
              value={supplier}
              sx={{ width: '100%' }}
              size="small"
              error={!!errors.supplier && !supplier}
              helperText={!supplier && errors.supplier ? 'Vui lòng chọn nhà cung cấp' : ''}
              {...register('supplier', { required: true })}
              onChange={handleChangeSupplier}
            >
              {suppliers?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
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
            <FormControl sx={{ width: '100%' }}>
              <TextField
                placeholder="Nhập giá sản phẩm"
                size="small"
                type="number"
                error={!!errors.cost}
                helperText={errors.cost?.type === 'min' ? 'Giá sản phẩm phải lớn hơn 0' : errors.cost?.type === 'required' ? 'Vui lòng nhập giá sản phẩm' : ''}
                {...register('cost', { required: true, min: 0 })}
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
              name="description"
              {...register('description')}
              placeholder="Nhập mô tả"
              style={{ width: '100%' }}
            />
            <Typography
              id="modal-modal-title"
              variant="body1"
              component="label"
              htmlFor="inputfile"
              sx={{
                mt: 2,
                mb: 1,
                color: '#6ECB63',
                cursor: 'pointer',
              }}
            >
              Thêm ảnh minh hoạ<span style={{ color: 'red' }}>*</span>
            </Typography>
            <input type="file" id="inputfile" className={styles.inputfile} {...register('thumnail', { required: true })} accept="image/*" />
            <br />
            {errors.thumnail && <span className={styles.errormessage}>Vui lòng thêm ảnh</span>}
            <Grid sx={12} className={styles.buttonside}>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  mr: 3,
                  borderRadius: '15px',
                  width: '164px',
                }}
                onClick={handleClose}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                size="medium"
                sx={{ borderRadius: '15px', width: '164px' }}
                type="submit"
              >
                Thêm
              </Button>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
}
