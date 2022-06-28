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
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './index.module.sass';
import { login } from '../../api';

const schema = yup.object().shape({
  userName: yup.string().required('Không được để trống trường này!'),
  password: yup.string().required('Không được để trống trường này!'),
});

function Login() {
  const history = useHistory();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { search } = useLocation();
  const errorInfo = new URLSearchParams(search).get('e');
  const onSubmit = async (data) => {
    try {
      const result = await login(data.userName, data.password);
      if (result) {
        const { user } = result;
        const { token } = result.tokens.access;
        localStorage.removeItem('jwt_token');
        localStorage.setItem('jwt_token', token);
        localStorage.removeItem('current_user');
        localStorage.setItem('current_user', JSON.stringify(user));
        history.push('/quan-ly-sp');
      }
    } catch (error) {
      history.push('/server-error');
    }
  };

  return (
    <Grid sx md>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.loginArea}>
          <Box className={styles.loginSite}>
            <Box className={styles.loginContent}>
              <Typography
                variant="h3"
                gutterBottom
                component="div"
                sx={{ width: '80%', mt: 3 }}
                className={styles.title}
              >
                Đăng nhập
              </Typography>
              <Box className={styles.inputField}>
                <TextField
                  label="Tài khoản"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.userName}
                  helperText={errors.userName?.message || ''}
                  placeholder="Nhập tên tài khoản"
                  variant="outlined"
                  sx={{ width: '80%', mt: 5 }}
                  {...register('userName')}
                />
              </Box>
              <Box className={styles.inputField}>
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
                  placeholder="******"
                  error={!!errors.password}
                  helperText={errors.password?.message || ''}
                  sx={{ width: '80%', mt: 2 }}
                  {...register('password')}
                />
              </Box>
              { errorInfo === '1' && <span className={styles.message}>Sai thông tin đăng nhập</span>}
              <Button
                variant="contained"
                sx={{
                  background: 'pink',
                  borderRadius: '20px',
                  width: '80%',
                }}
                type="submit"
              >
                Đăng nhập
              </Button>
              <Typography>
                Bạn chưa có tài khoản?
                <Link to="/register" className={styles.register}>
                  Đăng ký
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </form>
    </Grid>
  );
}

export default Login;
