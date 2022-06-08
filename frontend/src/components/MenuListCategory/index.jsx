/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { ListItemText, MenuItem, MenuList } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import styles from './index.module.sass';
import { getAllCategory } from '../../api';

function MenuListCategory() {
  const [categoryList, setCategoryList] = useState([]);
  const [activeObject, setActiveObject] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const getAll = async () => {
    const list = await getAllCategory();
    list.unshift('Tất cả');
    setCategoryList(list);
  };
  useEffect(() => {
    getAll();
  }, []);
  function toggleActive(item) {
    setActiveObject(item);
    const parsed = queryString.parse(location.search);
    parsed.cate = `${item}`;
    parsed.pageCurrent = 1;
    history.push({ search: `${queryString.stringify(parsed)}` });
  }
  function toggleActiveStyles(index) {
    if (categoryList[index] === activeObject) {
      return `${styles.active}`;
    }
    return '';
  }
  useEffect(() => {
    const currentCategory = new URLSearchParams(location.search).get('cate');
    if (currentCategory) {
      setActiveObject(currentCategory);
    } else {
      setActiveObject(categoryList[0]);
    }
  }, [location, categoryList]);
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
