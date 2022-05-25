/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { ListItemText, MenuItem, MenuList } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './index.module.sass';
import { getAllCategory } from '../../api';

function MenuListCategory() {
  const [categoryList, setCategoryList] = useState([]);
  const [activeObject, setActiveObject] = useState(null);
  const getAll = async () => {
    const list = await getAllCategory();
    list.unshift('Tất cả');
    setCategoryList(list);
  };
  const initialActiveObject = async () => {
    await setActiveObject(categoryList[0]);
  };
  useEffect(() => {
    getAll();
  }, []);
  useEffect(() => {
    initialActiveObject();
  }, [categoryList]);
  function toggleActive(item) {
    setActiveObject(item);
  }
  function toggleActiveStyles(index) {
    if (categoryList[index] === activeObject) {
      return `${styles.active}`;
    }
    return '';
  }
  return (
    <MenuList className={styles.menulistitem}>
      <MenuItem>
        <ListItemText inset>Danh Mục</ListItemText>
        <ArrowDropDownIcon />
      </MenuItem>
      {categoryList.map((item, index) => (
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

export default MenuListCategory;
