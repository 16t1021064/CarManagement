import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Divider,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import styles from './index.module.sass';

export default function AddModal() {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState('Car');

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

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Grid sx={12} class={styles.modaltitle}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Thêm sản phẩm
            </Typography>
            <CancelRoundedIcon styles={{ float: 'right' }} />
          </Grid>
          <Divider />
          <Typography
            id="modal-modal-title"
            variant="body1"
            component="h2"
            sx={{ mt: 2, mb: 1 }}
          >
            Tên Sản Phẩm<span style={{ color: 'red' }}>*</span>
          </Typography>
          <FormControl sx={{ width: '100%' }}>
            <OutlinedInput placeholder="Nhập tên sản phẩm" />
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
            sx={{ width: '100%' }}
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
            value={currency}
            onChange={handleChange}
            sx={{ width: '100%' }}
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
          <FormControl sx={{ width: '100%' }}>
            <OutlinedInput placeholder="Nhập giá sản phẩm" />
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
            placeholder="Nhập mô tả"
            style={{ width: '100%' }}
          />
          <Typography
            id="modal-modal-title"
            variant="body1"
            component="h2"
            sx={{ mt: 2, mb: 1, color: '#6ECB63' }}
          >
            Thêm ảnh minh hoạ<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Grid sx={12} className={styles.buttonside}>
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
              sx={{ borderRadius: '15px', width: '164px' }}
            >
              Thêm
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
