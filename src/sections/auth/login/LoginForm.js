import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

LoginForm.propTypes = {
  username: PropTypes.any.isRequired,
  password: PropTypes.any.isRequired,
  setUsername: PropTypes.func,
  setPassword: PropTypes.func,
  onLogin: PropTypes.func

};

export default function LoginForm({username, password, setUsername, setPassword, onLogin}) {
  const [showPassword, setShowPassword] = useState(false);

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

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onLogin}>
        Kirish
      </LoadingButton>
    </>
  );
}
