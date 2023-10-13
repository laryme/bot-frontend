import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Bosh sahifa',
    icon: 'eva:home-fill',
    path: '/dashboard',
  },
  {
    label: 'Kompaniyani almashtirish',
    icon: 'eva:settings-2-fill',
    path: '/dashboard/change-company',
  },
  {
    label: 'Sozlamalar',
    icon: 'eva:settings-2-fill',
    path: '/dashboard/settings',
  },
];

// ----------------------------------------------------------------------

AccountPopover.propTypes = {
  user: PropTypes.any
};

export default function AccountPopover({user}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClick = (path) => {
    setOpen(false);
    navigate(path, {replace: true})
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
    localStorage.removeItem('token-type')
    navigate('/login', { replace: true });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src='/assets/images/avatars/avatar_1.jpg' alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 200,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user? user.fullName:'name'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user ? user.role.name : 'role'}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClick(option.path)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Chiqish
        </MenuItem>
      </Popover>
    </>
  );
}
