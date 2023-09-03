import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Stack,
    TextField, 
    Container, 
    Typography, 
    Box
  } from '@mui/material';
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";




export default function AccountPage() {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: 'name',
    username: 'username',
  });
  const token = localStorage.getItem('access-token');
  const [password, setPassword] = useState({
    password: '',
    currentPassword: '',
    confirmPassword: ''
  });

  useEffect(()=>{
    const apiUrl = 'http://laryme.jprq.live/api/v1/users/profile';
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
  }, [])

  const handleDetailChange = useCallback(
    (event) => {
      setUser((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handlePasswordChange = useCallback(
    (event) => {
      setPassword((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

    const updateUserDetails = (newUser) => {
      const apiUrl = `http://laryme.jprq.live/api/v1/users/${user.id}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token-type')}${token}`
        },
      }
      axios.put(apiUrl, newUser, config) 
        .then(response => {
            console.log(response)
            if(response.status === 204){
                localStorage.removeItem('access-token')
                localStorage.removeItem('token-type')
                navigate('/login', {replace: true})
                return
            }
          const {data} = response.data;
          Swal.fire(
            'Muvaffaqqiyatli',
            response.data.message,
            'success'
        )
       }).catch((error) => {
        const res = error.response
        if(res.status === 409){
            Swal.fire(
                'Xatolik',
                res.data.message,
                'error'
            )
        }
        Swal.fire(
            'Xatolik',
            'Xatolik sodir bo\'ldi',
            'error'
        )
      })
    }
  
    const updateUserPassword = ( ) => {
    console.log(password)
      const apiUrl = `http://laryme.jprq.live/api/v1/users/${user.id}/change-password`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token-type')}${token}`
        },
      }

      axios.put(apiUrl, password, config)
        .then(response => {
            const data = response.data
            Swal.fire(
                'Muvaffaqqiyatli',
                data.message,
                'success'
            )
       }).catch((error) => {
        Swal.fire(
            'Xatolik',
            'Xatolik sodir bo\'ldi',
            'error'
        )
      }) 
    }

    console.log('account-page   ', user)


    return (
        <>
            <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">
            Foydalanuvchi kabineti
          </Typography>
          <Card>
        <CardHeader
          subheader="Foydalanuvchi malumotlarini o'zgartirish"
          title="Foydalanuvchi malumotlari"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Ism"
              name="fullName"
              onChange={handleDetailChange}
              type="text"
              value={user.fullName}
            />
            <TextField
              fullWidth
              label="Foydalanuvchi nomi"
              name="username"
              onChange={handleDetailChange}
              type="text"
              value={user.username}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={() => updateUserDetails(user)}>
            Yangilash
          </Button>
        </CardActions>
      </Card>
          <Card>
        <CardHeader
          subheader="Maxfiy so'zni o'zgartirish"
          title="Maxfiy so'z"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Maxfiy so'zni kiriting"
              name="currentPassword"
              onChange={handlePasswordChange}
              type="text"
              value={password.currentPassword}
            />
            <TextField
              fullWidth
              label="Yangi maxfiy so'zni kiriting"
              name="password"
              onChange={handlePasswordChange}
              type="text"
              value={password.password}
            />
            <TextField
              fullWidth
              label="Yangi maxfiy so'z tasdiqini kiriting"
              name="confirmPassword"
              onChange={handlePasswordChange}
              type="text"
              value={password.confirmPassword}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={() => updateUserPassword(password)}>
            Yangilash
          </Button>
        </CardActions>
      </Card>
        </Stack>
      </Container>
    </Box>
        </>
    )
}