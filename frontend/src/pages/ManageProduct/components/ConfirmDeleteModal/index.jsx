import {
  Box,
  Button,
  Grid,
  Modal,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './index.module.sass';
import { deleteCar } from '../../../../api';
import useModal from '../../../../hooks/useModal';

// eslint-disable-next-line react/prop-types
export default function ConfirmDeleteModal({ carName, carId, setResetCar }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();
  const [openModal] = useModal();
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
  const deleteCarById = async (id) => {
    try {
      const result = await deleteCar(id);
      if (result) {
        handleClose();
        setResetCar(true);
        openModal('Xoá sản phẩm thành công!!');
      }
    } catch (error) {
      history.pushState('/server-error');
    }
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        size="small"
        sx={{
          mt: 1,
          width: '94px',
          background: 'red',
          textTransform: 'none',
        }}
      >
        Xoá
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid xs={12}>
            <Box sx={{ textAlign: 'center' }}>
              <svg
                width="92"
                height="92"
                viewBox="0 0 92 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M87.4 29.1333H79.7333V26.0667C79.7253 24.1243 78.498 22.3963 76.6666 21.7488V13.8C76.6601 10.1079 74.0229 6.94488 70.3922 6.2744C69.7218 2.64369 66.5587 0.00654525 62.8666 0H21.4667C21.06 8.6848e-05 20.6701 0.161691 20.3826 0.449267L0.449267 20.3826C0.161691 20.6701 8.6848e-05 21.06 0 21.4667V62.8666C0 63.7135 0.686496 64.4 1.53333 64.4C2.38017 64.4 3.06667 63.7135 3.06667 62.8666V23H15.3333C19.5654 22.9949 22.9949 19.5654 23 15.3333V3.06667H62.8666C65.4072 3.06667 67.4666 5.12616 67.4666 7.66666V21.4667H50.6C48.0595 21.4667 46 23.5262 46 26.0667V29.1333H38.3333C35.7928 29.1333 33.7333 31.1928 33.7333 33.7333V35.2667C33.7403 37.2637 35.038 39.027 36.9426 39.6275L41.6745 79.7333H7.66666C5.12615 79.7333 3.06667 77.6738 3.06667 75.1333C3.06667 74.2865 2.38017 73.6 1.53333 73.6C0.686496 73.6 0 74.2865 0 75.1333C0.00654525 78.8254 2.64369 81.9884 6.2744 82.6589C6.94488 86.2896 10.1079 88.9268 13.8 88.9333H42.8889C43.533 90.7691 45.2658 91.9985 47.2113 92H78.522C80.863 92.0035 82.8317 90.2449 83.0913 87.9182L88.7907 39.6275C90.6953 39.027 91.993 37.2637 92 35.2667V33.7333C92 31.1928 89.9405 29.1333 87.4 29.1333ZM15.3333 19.9333H5.2348L19.9333 5.2348V15.3333C19.9333 17.8738 17.8738 19.9333 15.3333 19.9333ZM70.5333 9.48213C72.3646 10.1296 73.5919 11.8576 73.6 13.8V21.4667H70.5333V9.48213ZM49.0667 26.0667C49.0667 25.2198 49.7531 24.5333 50.6 24.5333H75.1333C75.9801 24.5333 76.6666 25.2198 76.6666 26.0667V29.1333H49.0667V26.0667ZM9.48213 82.8H42.0379L42.3982 85.8666H13.8C11.8576 85.8586 10.1296 84.6313 9.48213 82.8ZM80.04 87.5686C79.9541 88.3449 79.2984 88.9326 78.5174 88.9333H47.2113C46.4244 88.9325 45.7659 88.3362 45.6872 87.5533L40.0583 39.8667H85.675L80.04 87.5686ZM88.9333 35.2667C88.9333 36.1135 88.2468 36.8 87.4 36.8H38.3333C37.4865 36.8 36.8 36.1135 36.8 35.2667V33.7333C36.8 32.8865 37.4865 32.2 38.3333 32.2H87.4C88.2468 32.2 88.9333 32.8865 88.9333 33.7333V35.2667Z"
                  fill="#428DFF"
                />
              </svg>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ textAlign: 'center', mt: 5 }}>
              <div className={styles.fontmessage}>
                Bạn có chắc muốn xoá sản phẩm <span className={styles.redString} style={{ textTransform: 'Uppercase' }}>{carName}?</span>
              </div>
              <div className={styles.fontmessage}>
                Sản phẩm này sẽ bị <span className={styles.redString}>xoá vĩnh viễn</span>
              </div>
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box className={styles.areabutton} sx={{ mt: 5 }}>
              <Button variant="outlined" size="large" className={styles.buttonConfirm} onClick={handleClose}>
                Huỷ
              </Button>
              <Button variant="contained" color="error" size="large" className={styles.buttonConfirm} onClick={() => deleteCarById(carId)}>
                Xoá
              </Button>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
