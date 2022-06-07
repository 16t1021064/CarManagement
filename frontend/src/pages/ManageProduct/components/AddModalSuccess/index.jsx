/* eslint-disable react/prop-types */
import { Modal, Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './index.module.sass';
import img from '../../../../image/Shape.jpg';

export default function AddModalSuccess({ openAddSuccess, message }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (location.pathname === '/cap-nhat-sp') {
      history.push('quan-ly-sp');
    }
  };

  useEffect(() => {
    if (openAddSuccess) {
      handleOpen();
    }
  }, [openAddSuccess]);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid xs={12}>
          <CancelRoundedIcon
            onClick={handleClose}
            sx={{ cursor: 'pointer', float: 'right' }}
          />
        </Grid>
        <Grid xs={12} className={styles.imgandmessage}>
          <img src={img} alt="" />
          <Box className={styles.fontmessage} sx={{ mt: 2, mb: 5 }}>
            {message}
          </Box>
        </Grid>
      </Box>
    </Modal>
  );
}
