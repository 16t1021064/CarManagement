import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Paginator() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}

export default Paginator;
