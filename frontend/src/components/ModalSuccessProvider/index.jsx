/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { Modal, Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import styles from './index.module.sass';
import img from '../../image/Shape.jpg';

export const ModalContext = React.createContext({});

const ModalSuccessProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = (inputMessage) => {
    setMessage(inputMessage);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <ModalContext.Provider
      value={{
        handleOpen,
      }}
    >
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
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalSuccessProvider;
