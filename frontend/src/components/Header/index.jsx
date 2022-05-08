// eslint-disable-next-line quotes
import { Grid } from "@mui/material";
// eslint-disable-next-line quotes
import React, { useState } from "react";
// eslint-disable-next-line quotes
import { Link } from "react-router-dom";
// eslint-disable-next-line quotes
import styles from "./index.module.sass";

function Header() {
  const [list, setList] = useState({
    activeObject: null,
    routes: [
      {
        id: 0,
        to: '/quan-ly-sp',
        name: 'Sản phẩm',
      },
      {
        id: 1,
        to: '/danh-sach-sp',
        name: 'Danh Sách Sản phẩm',
      },
    ],
  });
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
    <Grid item xs={12}>
      <div className={styles.header}>
        <Grid item xs={3}>
          <div className={styles.logo}>
            <Link href="./">
              <svg
                width={34}
                height={34}
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width={34} height={34} fill="url(#pattern0)" />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width={1}
                    height={1}
                  >
                    <use
                      xlinkHref="#image0_39_1606"
                      transform="scale(0.0121951)"
                    />
                  </pattern>
                  <image
                    id="image0_39_1606"
                    width={82}
                    height={82}
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
              <span>NCC</span>
            </Link>
          </div>
        </Grid>
        <Grid item xs={4}>
          <ul>
            {list.routes.map((item) => (
              <Grid item xs={6} key={item.to}>
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
          </ul>
        </Grid>
      </div>
    </Grid>
  );
}

export default Header;
