import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Swal from 'sweetalert2';

// components
import Iconify from '../../../components/iconify';
import { API_BASE_URL } from '../../../utils/config';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  
  const showToast = () => {
    Toast.fire({
      icon: 'error',
      title: 'Foydalanuvchi nomi yoki parol xato'
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    const tokenType = localStorage.getItem('token-type');

    if(token !== null && tokenType === 'Bearer '){
      axios.get('')
      navigate('/dashboard', {replace: true})
    }
  });

  const handleClick = () => {
    axios.post(
      `${API_BASE_URL}/auth/sign-in`,
      {
        username,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response)
        const {data} = response;
        if(data.success){
          const token = data.data;
          localStorage.setItem('access-token', token.accessToken)
          localStorage.setItem('refresh-token', token.refreshToken)
          localStorage.setItem('token-type', token.tokenType)
          navigate('/dashboard', { replace: true });
        }
      }).catch(e =>{
        showToast()
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username" 
          label="Foydalanuvchi nomini kiriting"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          name="password"
          label="Maxfiy so'z"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Maxfiy so'zni unutdingizmi?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Kirish
      </LoadingButton>
    </>
  );
}
