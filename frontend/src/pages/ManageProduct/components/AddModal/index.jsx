/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import {
  React,
  useEffect,
  useState,
} from 'react';
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
// import queryString from 'query-string';
import Modal from '@mui/material/Modal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useForm } from 'react-hook-form';
import styles from './index.module.sass';
import { createCar, getRelate } from '../../../../api';
import useModal from '../../../../hooks/useModal';

const schema = yup.object().shape({
  thumnail: yup
    .mixed()
    .test('required', 'Vui lòng chọn ảnh đại diện', (value) => value && value.length)
    .test('type', 'Vui lòng nhập file đúng định dạng JPEG, JPG, PNG', (value) => value && value[0] && (value[0].type === 'image/jpeg' || value[0].type === 'image/jpg' || value[0].type === 'image/png')),
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

export default function AddModal({ setResetCar }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = useState(false);
  const [list, setList] = useState({
    categories: [],
    suppliers: [],
  });
  const [currentCate, setCurrentCate] = useState('');
  const [selectedThumnail, setSelectedThumnail] = useState();
  const [preview, setPreview] = useState();
  const [showModal] = useModal();
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
  const history = useHistory();
  const getList = async (category) => {
    try {
      let result;
      if (category === 'Tất cả' || category === '') {
        result = await getRelate('*');
      } else {
        result = await getRelate(category);
      }
      setList(result);
    } catch (error) {
      history.push('/server-error');
    }
  };
  useEffect(() => {
    getList(currentCate);
  }, [currentCate]);
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

  const previewThumb = () => {
    if (selectedThumnail) {
      return (
        <div style={{ width: '200px', height: '130px' }}>
          <img src={preview} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
      );
    }
    return <></>;
  };

  const handleChangeCategory = (event) => {
    setValue('category', event.target.value);
    clearErrors('category');
    setCurrentCate(event.target.value);
  };

  const handleChangeSupplier = (event) => {
    setValue('supplier', event.target.value);
    clearErrors('supplier');
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
    try {
      const result = await createCar(formData);
      if (result) {
        handleClose(true);
        showModal('Thêm sản phẩm thành công');
        setResetCar(true);
        reset({});
        setValue('category', '');
        setValue('supplier', '');
        setPreview(undefined);
        setSelectedThumnail(null);
      }
    } catch (error) {
      history.push('/server-error');
    }
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
                helperText={errors.name?.message}
                {...register('name', { required: true, maxLength: 30, minLength: 3 })}
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
              value={getValues('category')}
              sx={{ width: '100%' }}
              label="--Chọn loại sản phẩm--"
              size="small"
              name="category"
              helperText={errors.category?.message}
              {...register('category', { required: true })}
              error={!!errors.category && !getValues('category')}
              onChange={handleChangeCategory}
            >
              {list.categories?.map((option) => (
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
              value={getValues('supplier')}
              sx={{ width: '100%' }}
              size="small"
              error={!!errors.supplier && !getValues('supplier')}
              helperText={errors.supplier?.message}
              {...register('supplier', { required: true })}
              onChange={handleChangeSupplier}
              disabled={!getValues('category')}
            >
              {list.suppliers?.map((option) => (
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
                helperText={errors.cost?.message}
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
            <input type="file" id="inputfile" className={styles.inputfile} {...register('thumnail', { required: 'Vui lòng chọn ảnh đại diện', pattern: '/\.(jpg|jpeg|png|gif)$/)' })} accept="image/*" onChange={onSelectFile} />
            {
              previewThumb()
            }
            <br />
            {
             !!errors.thumnail
             && <span className={styles.errormessage}>{errors.thumnail?.message}</span>
            }
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
