/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ListItemText, MenuItem, MenuList } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './index.module.sass';

function MenuListItem({ categories }) {
  const [activeObject, setActiveObject] = useState(null);
  function toggleActive(item) {
    setActiveObject(item);
  }
  function toggleActiveStyles(index) {
    if (categories[index] === activeObject) {
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
      {categories.map((item, index) => (
        <MenuItem
          key={item.id}
          onClick={() => toggleActive(item)}
          className={toggleActiveStyles(index)}
        >
          <ListItemText inset>{item}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
}

export default MenuListItem;
