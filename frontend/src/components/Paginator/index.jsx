/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import queryString from 'query-string';
import Stack from '@mui/material/Stack';
import { useHistory, useLocation } from 'react-router-dom';

function Paginator({ totalCar }) {
  const history = useHistory();
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('pageCurrent');
  const [currentPage, setCurrentPage] = useState(page || 1);
  const countPage = Math.ceil(totalCar / 6) || 0;
  const handleChange = (e, value) => {
    setCurrentPage(value);
    const parsed = queryString.parse(location.search);
    parsed.pageCurrent = `${value}`;
    history.push({ search: `${queryString.stringify(parsed)}` });
  };
  return (
    <Stack sx={{ mb: 2 }}>
      <Pagination
        count={countPage}
        variant="outlined"
        shape="rounded"
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
}

export default Paginator;
