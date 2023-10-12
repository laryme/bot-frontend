import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import CompanyList from '../sections/auth/login/CompanyList';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import { LoginForm } from '../sections/auth/login';


import { API_BASE_URL } from '../utils/config';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openCompany, setCompany] = useState(false);
  const [userCompanyDetails, setDetails] = useState();

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
      navigate('/dashboard', {replace: true})
    }
  });

  const handleLogin = () => {
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
          const resData = data.data;

          if(resData.hasToken){
            localStorage.setItem('token-type', resData.tokenType)
            localStorage.setItem('access-token', resData.accessToken)
            localStorage.setItem('refresh-token', resData.refreshToken)
            navigate('/dashboard', { replace: true });
          } else {
            setDetails(resData)
            setCompany(true);
          }
        }
      }).catch(e =>{
        showToast()
      });
  };

  const handleChooseCompany = (companyID) => {
    axios.post(
      `${API_BASE_URL}/auth/change-company`,
      {
        username,
        password,
        companyId: companyID
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((responce => {
      const {data} = responce;

      if(data.success){
        const resData = data.data;
        localStorage.setItem('token-type', resData.tokenType)
        localStorage.setItem('access-token', resData.accessToken)
        localStorage.setItem('refresh-token', resData.refreshToken)
        navigate('/dashboard', { replace: true });
      }
    })).catch((e => {
      navigate('/login', { replace: true });
    }));
  }


  return (
    <>
      <Helmet>
        <title> Login | Nazoratichi Bot </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Xush kelibsiz!
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        {!openCompany && (
          <Container maxWidth="sm">
            <StyledContent>
              <Typography variant="h4" gutterBottom>
                Boshqaruv paneliga kirish
              </Typography>

              <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} onLogin={handleLogin}/>
            </StyledContent>
        </Container>
        )}

        {openCompany && (
          <Container maxWidth="sm">
            <StyledContent>
              <Typography variant="h3" gutterBottom align='center'>
                Salom, {userCompanyDetails.fullName}!
              </Typography>
              <Typography variant="overline" mb={3} align='center' >
                Iltimos kompaniyangizni tanlang.
              </Typography>

              <CompanyList companies={userCompanyDetails.companies} onClick={handleChooseCompany}/>
            </StyledContent>
          </Container>
        )}


      </StyledRoot>
    </>
  );
}
