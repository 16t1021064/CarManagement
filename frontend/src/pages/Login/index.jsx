import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import styles from './index.module.sass';

const Login = () => (
  <Grid sx md>
    <Box className={styles.loginArea}>
      <Box className={styles.loginSite}>
        <Box className={styles.loginContent}>
          <Typography variant="h3" gutterBottom component="div" sx={{ width: '80%', mt: 3 }} className={styles.title}>
            Đăng nhập
          </Typography>
          <TextField
            label="Tài khoản"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            placeholder="Nhập tên tài khoản"
            variant="outlined"
            sx={{ width: '80%', mt: 5 }}
          />
          <TextField
            label="Mật khẩu"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            type="password"
            placeholder="*******************"
            sx={{ width: '80%', mt: 2 }}
          />
          <Button>
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Box>
  </Grid>
);

export default Login;
