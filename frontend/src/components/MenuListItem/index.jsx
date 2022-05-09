import React, { useEffect, useState } from 'react';
import { ListItemText, MenuItem, MenuList } from '@mui/material';
import styles from './index.module.sass';

function MenuListItem() {
  const [list, setList] = useState({
    routes: [
      {
        id: 0,
        name: 'Tất cả',
        value: 'All',
      },
      {
        id: 1,
        name: 'Ô tô',
        value: 'Car',
      },
      {
        id: 2,
        name: 'Xe Máy',
        value: 'Bike',
      },
      {
        id: 3,
        name: 'Xe Đạp',
        value: 'Bicycle',
      },
    ],
    activeObject: null,
  });
  useEffect(() => {
    setList({ ...list, activeObject: list.routes[0] });
  }, []);
  function toggleActive(index) {
    setList({ ...list, activeObject: list.routes[index] });
  }
  function toggleActiveStyles(index) {
    if (list.routes[index] === list.activeObject) {
      return `${styles.active}`;
    }
    return '';
  }
  return (
    <MenuList className={styles.menulistitem}>
      <MenuItem>
        <ListItemText inset>Danh Mục</ListItemText>
      </MenuItem>
      {list.routes.map((item) => (
        <MenuItem
          key={item.id}
          onClick={() => toggleActive(item.id)}
          className={toggleActiveStyles(item.id)}
        >
          <ListItemText inset>{item.name}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
}

export default MenuListItem;
