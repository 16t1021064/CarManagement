/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { ListItemText, MenuItem, MenuList } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './index.module.sass';
import { getAllSupplier } from '../../api';

function MenuListSupplier() {
  const [activeObject, setActiveObject] = useState(null);
  const [supplierList, setSupplierList] = useState([]);
  const getAll = async () => {
    const list = await getAllSupplier();
    list.unshift('Tất cả');
    setSupplierList(list);
  };
  const initialActiveObject = async () => {
    await setActiveObject(supplierList[0]);
  };
  useEffect(() => {
    getAll();
  }, []);
  useEffect(() => {
    initialActiveObject();
  }, [supplierList]);
  function toggleActive(item) {
    setActiveObject(item);
  }
  function toggleActiveStyles(index) {
    if (supplierList[index] === activeObject) {
      return `${styles.active}`;
    }
    return '';
  }
  return (
    <MenuList className={styles.menulistitem}>
      <MenuItem>
        <ListItemText inset>Nhà Cung Cấp</ListItemText>
        <ArrowDropDownIcon />
      </MenuItem>
      {supplierList.map((item, index) => (
        <MenuItem
          key={item}
          onClick={() => toggleActive(item)}
          className={toggleActiveStyles(index)}
        >
          <ListItemText inset>{item}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
}

export default MenuListSupplier;
