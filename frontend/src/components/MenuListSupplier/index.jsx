/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { ListItemText, MenuItem, MenuList } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './index.module.sass';

function MenuListItem({ suppliers }) {
  const [activeObject, setActiveObject] = useState(null);
  useEffect(() => {
    suppliers.unshift('Tất cả');
    setActiveObject(suppliers[0]);
  }, [suppliers]);
  function toggleActive(item) {
    setActiveObject(item);
  }
  function toggleActiveStyles(index) {
    if (suppliers[index] === activeObject) {
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
      {suppliers.map((item, index) => (
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

export default MenuListItem;
