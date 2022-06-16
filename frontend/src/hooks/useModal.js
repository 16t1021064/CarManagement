/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useContext } from 'react';
import { ModalContext } from '../components/ModalSuccessProvider';

export default function useModal() {
  const { handleOpen, handleClose } = useContext(ModalContext);

  const showModal = (message) => {
    handleOpen(message);
  };

  const closeModal = () => {
    handleClose();
  };

  return [showModal, closeModal];
}
