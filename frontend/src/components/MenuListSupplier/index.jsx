/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { ListItemText, MenuItem, MenuList } from '@mui/material';
import queryString from 'query-string';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './index.module.sass';
import { getAllSupplier } from '../../api';

function MenuListSupplier() {
  const [activeObject, setActiveObject] = useState(null);
  const [supplierList, setSupplierList] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const getAll = async () => {
    const list = await getAllSupplier();
    list.unshift('Tất cả');
    setSupplierList(list);
  };
  useEffect(() => {
    getAll();
  }, []);
  function toggleActive(item) {
    setActiveObject(item);
    const parsed = queryString.parse(location.search);
    parsed.supplier = `${item}`;
    parsed.pageCurrent = 1;
    history.push({ search: `${queryString.stringify(parsed)}` });
  }
  function toggleActiveStyles(index) {
    if (supplierList[index] === activeObject) {
      return `${styles.active}`;
    }
    return '';
  }
  useEffect(() => {
    const currentSup = new URLSearchParams(location.search).get('supplier');
    if (currentSup) {
      setActiveObject(currentSup);
    } else {
      setActiveObject(supplierList[0]);
    }
  }, [location, supplierList]);
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
