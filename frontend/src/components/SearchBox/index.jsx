/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Grid } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import queryString from 'query-string';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './index.module.sass';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
function SearchBox() {
  const searchRef = useRef();
  const typingTimeoutRef = useRef(null);
  const location = useLocation();
  const history = useHistory();
  const getSearchValue = (e) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const parsed = queryString.parse(location.search);
      parsed.searchValue = `${e.target.value}`;
      parsed.pageCurrent = 1;
      history.push({ search: `${queryString.stringify(parsed)}` });
    }, 600);
  };
  const curSearchValue = new URLSearchParams(location.search).get('searchValue');
  useEffect(() => {
    if (curSearchValue) {
      searchRef.current.value = curSearchValue;
    }
  }, [curSearchValue]);
  return (
    <Grid xs={3} className={styles.searchbox}>
      <Search className={styles.searchfield}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="T??m Ki???m"
          inputProps={{ 'aria-label': 'search', ref: searchRef }}
          onChange={getSearchValue}
        />
      </Search>
    </Grid>
  );
}

export default SearchBox;
