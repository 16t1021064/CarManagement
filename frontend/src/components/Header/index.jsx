/* eslint-disable consistent-return */
import { Box, Grid } from '@mui/material';
import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserArea from '../UserArea';
import styles from './index.module.sass';

function Header() {
  const currentUser = localStorage.getItem('current_user');
  const curUser = useMemo(() => JSON.parse(currentUser), [currentUser]);
  const returnRouter = () => {
    let routes = [];
    if (curUser) {
      routes = [
        {
          id: 0,
          to: '/quan-ly-sp',
          name: 'Quản Lý Sản phẩm',
        },
        {
          id: 1,
          to: '/danh-sach-sp',
          name: 'Sản Phẩm',
        },
      ];
    } else {
      routes = [
        {
          id: 1,
          to: '/danh-sach-sp',
          name: 'Sản Phẩm',
        },
      ];
    }
    return routes;
  };

  const [list, setList] = useState({
    routes: [],
    activeObject: null,
  });
  const location = useLocation();
  const tmpList = useMemo(() => returnRouter(), [curUser]);
  function toggleActive(index) {
    setList({ ...list, activeObject: list.routes[index] });
  }
  function toggleActiveStyles(index) {
    if (list.routes[index] === list.activeObject) {
      return `${styles.active}`;
    }
    return '';
  }
  const userArea = () => {
    if (location.pathname === '/login') {
      return <></>;
    }
    if (!curUser) {
      return (
        <li style={{ justifyContent: 'flex-end', color: '#fff' }}>
          <Link
            to="/login"
          >
            Đăng nhập
          </Link>
        </li>
      );
    }
    return <li style={{ justifyContent: 'flex-end' }}><UserArea currentUser={curUser} /></li>;
  };

  useEffect(() => {
    if (location.pathname === '/danh-sach-sp') {
      setList({ ...list, activeObject: list.routes[1] });
    } else {
      setList({ ...list, activeObject: list.routes[0] });
    }
  }, [location]);
  return (
    <Grid xs={12}>
      <Box>
        <div className={styles.header}>
          <Grid xs={4} md={2}>
            <div className={styles.logo}>
              <Link to="/">
                <span>LTE</span>
              </Link>
            </div>
          </Grid>
          <Grid xs={8} md={10}>
            <ul>
              {tmpList.map((item) => (
                <Grid xs={6} md={3} key={item.to}>
                  <li>
                    <Link
                      // eslint-disable-next-line react/jsx-curly-brace-presence
                      to={item.to}
                      onClick={() => toggleActive(item.id)}
                      className={toggleActiveStyles(item.id)}
                    >
                      {item.name}
                    </Link>
                  </li>
                </Grid>
              ))}
              <Grid xs md key="user">
                {
                  userArea()
                }
              </Grid>
            </ul>
          </Grid>
        </div>
      </Box>
    </Grid>
  );
}

export default Header;
