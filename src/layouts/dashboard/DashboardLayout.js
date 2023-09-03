import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import axios from 'axios';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const token = localStorage.getItem('access-token');

  useEffect(()=>{
    console.log('dashboard layout use effect')
    if(token !== null){
      console.log('token bor')
      const apiUrl = 'http://laryme.jprq.live/api/v1/users/me';
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token-type')}${token}`
        },
      }
      axios.get(apiUrl, config)
        .then(response => {
          const {data} = response.data;
          console.log(data)
          setUser(data);
       }).catch((error) => {
         navigate('/login', {replace: true})
      })
    }else{
      console.log('token yoq')
      navigate('/login', {replace: true})
    }
  }, [])

  return (
    <StyledRoot>
      <Header user={user} onOpenNav={() => setOpen(true)} />

      <Nav user={user} openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
