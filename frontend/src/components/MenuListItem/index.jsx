/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { ListItemText, MenuItem, MenuList } from '@mui/material';
import queryString from 'query-string';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './index.module.sass';

function MenuListItem({ incomeList, cate, header }) {
  const [list, setList] = useState(['Tất cả']);
  const location = useLocation();
  const history = useHistory();
  const current = new URLSearchParams(location.search).get(cate);
  const [activeObject, setActiveObject] = useState(current || list[0]);
  useEffect(() => {
    setList([...list, ...incomeList]);
  }, [incomeList]);
  function toggleActive(item) {
    setActiveObject(item);
    const parsed = queryString.parse(location.search);
    parsed[cate] = `${item}`;
    parsed.pageCurrent = 1;
    history.push({ search: `${queryString.stringify(parsed)}` });
  }
  function toggleActiveStyles(index) {
    if (list[index] === activeObject) {
      return `${styles.active}`;
    }
    return '';
  }
  return (
    <MenuList className={styles.menulistitem}>
      <MenuItem>
        <ListItemText inset>{header}</ListItemText>
        <ArrowDropDownIcon />
      </MenuItem>
      {list.map((item, index) => (
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
