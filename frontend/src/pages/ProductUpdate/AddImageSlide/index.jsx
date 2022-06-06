/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Grid, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
// import React, { useEffect, useState } from 'react';
import styles from './index.module.sass';

export default function AddImageSlide({
  num,
  item,
  galleryStr,
  galleryFile,
  setGalleryStr,
  setGalleryFile,
}) {
  const [selectedGallery, setSelectedGallery] = useState();
  const [preview, setPreview] = useState();
  const [currentItem, setCurrentItem] = useState('');
  useEffect(() => {
    if (!selectedGallery) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedGallery);
    setPreview(objectUrl);
    const tmpStr = [...galleryStr];
    tmpStr[num] = '';
    setGalleryStr(tmpStr);
    const tmpFile = [...galleryFile];
    tmpFile[num] = selectedGallery;
    setGalleryFile(tmpFile);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedGallery]);
  useEffect(() => {
    setCurrentItem(item);
  }, [item]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedGallery(undefined);
      return;
    }
    setSelectedGallery(e.target.files[0]);
  };
  const handleDelete = () => {
    setSelectedGallery(undefined);
    setCurrentItem('');
    const tmpStr = [...galleryStr];
    tmpStr[num] = '';
    setGalleryStr(tmpStr);
    const tmpFile = [...galleryFile];
    tmpFile[num] = undefined;
    setGalleryFile(tmpFile);
  };
  const renderGalleryItem = () => {
    if (selectedGallery) {
      return (
        <Grid xs={5} className={styles.imgslideframe}>
          <Box className={styles.imgslidetitle}>Ảnh {num + 1}</Box>
          <Box className={styles.imgslide}>
            <img src={preview} alt="" />
            <Box className={styles.hoverimageslide}>
              <label htmlFor={`inputgallery${num}`}>
                <Button
                  variant="outlined"
                  className={styles.hoverslidebtn}
                  htmlFor="inputgallery"
                  component="span"
                >
                  Cập nhật
                </Button>
              </label>
              <input
                type="file"
                id={`inputgallery${num}`}
                style={{ display: 'none' }}
                onChange={onSelectFile}
              />
              <Button
                variant="outlined"
                className={styles.hoverslidebtn}
                onClick={handleDelete}
              >
                Xoá
              </Button>
            </Box>
          </Box>
        </Grid>
      );
    }
    if (currentItem !== '') {
      return (
        <Grid xs={5} className={styles.imgslideframe}>
          <Box className={styles.imgslidetitle}>Ảnh {num + 1}</Box>
          <Box className={styles.imgslide}>
            <img src={item} alt="" />
            <Box className={styles.hoverimageslide}>
              <label htmlFor={`inputgallery${num}`}>
                <Button
                  variant="outlined"
                  className={styles.hoverslidebtn}
                  htmlFor="inputgallery"
                  component="span"
                >
                  Cập nhật
                </Button>
              </label>
              <input
                type="file"
                id={`inputgallery${num}`}
                style={{ display: 'none' }}
                onChange={onSelectFile}
              />
              <Button
                variant="outlined"
                className={styles.hoverslidebtn}
                onClick={handleDelete}
              >
                Xoá
              </Button>
            </Box>
          </Box>
        </Grid>
      );
    }
    return (
      <Grid xs={5} className={styles.addslideframe}>
        <Box className={styles.addtitle}>Ảnh {num + 1}</Box>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id={`inputgallery${num}`}
          onChange={onSelectFile}
        />
        <Box className={styles.addslide}>
          <label htmlFor={`inputgallery${num}`}>
            <Box className={styles.borderSlide}>
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.4744 30.8H12.7856C11.738 30.8 10.8894 29.9514 10.8894 28.9037V20.3706H2.35624C1.30858 20.3706 0.459991 19.522 0.459991 18.4743V12.7856C0.459991 11.7379 1.30858 10.8893 2.35624 10.8893H10.8894V2.35621C10.8894 1.30855 11.738 0.459961 12.7856 0.459961H18.4744C19.522 0.459961 20.3706 1.30855 20.3706 2.35621V10.8893H28.9037C29.9514 10.8893 30.8 11.7379 30.8 12.7856V18.4743C30.8 19.522 29.9514 20.3706 28.9037 20.3706H20.3706V28.9037C20.3706 29.9514 19.522 30.8 18.4744 30.8Z"
                  fill="#00CCFF"
                />
              </svg>
            </Box>
          </label>
        </Box>
      </Grid>
    );
  };
  return <>{renderGalleryItem()}</>;
}
