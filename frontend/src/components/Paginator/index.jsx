/* eslint-disable import/no-cycle */
import React, { useState, useContext, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { AppContext } from '../../App';

function Paginator() {
  const [currentPage, setCurrentPage] = useState(1);
  const { total, paginateInfo, setPaginateInfo } = useContext(AppContext);
  const { pageLimit } = paginateInfo;
  const countPage = Math.round(total / pageLimit);
  const handleChange = async (e, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    setPaginateInfo({
      pageLimit: paginateInfo.pageLimit,
      pageCurrent: currentPage,
    });
  }, [currentPage]);
  return (
    <Stack spacing={2}>
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
