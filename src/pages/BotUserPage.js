import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  IconButton,
} from '@mui/material';

import axios from 'axios';
import Swal from 'sweetalert2';

// components

import { Delete } from '@mui/icons-material';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';


// sections
import { UserListHead } from '../sections/@dashboard/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'ISM', alignRight: false },
  { id: 'username', label: 'USERNAME', alignRight: false },
  { id: 'password', label: 'STATUS', alignRight: false },
  { id: 'role', label: 'ROL', alignRight: false },
  { id: '' },
];




// ----------------------------------------------------------------------

export default function UserPage() {

  const avatarUrl = '/assets/images/avatars/avatar_2.jpg'
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://laryme.jprq.live/api/v1/users';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
      }
    };
    // Fetch user data from the backend API
    axios.get(apiUrl, config)
        .then(response => {
          const {data} = response.data
          console.log(data.content)

          setUsers(data.content);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
  }, []);

  const handleDeleteUser = (id) => {
    const apiUrl = `http://localhost:8081/api/v1/users/${id}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
      }
    };
  
    axios.delete(apiUrl, config)
      .then(response => {
        const {data} = response
        setUsers(users.filter(user => user.id !== id))
        Swal.fire(
          data.success ? 'O\'chirildi!' : 'Xatolik',
          data.message,
          data.success ? 'success' : 'fail'
        )
      })
      .catch(error => {
        Swal.fire(
          'Xatolik',
          'Xatolik sodir bo\'ldi',
          'error'
        )
      })
  }
  
  const showDeleteAlert = (id) => {
    Swal.fire({
      title: 'Tasdiqlaysizmi?',
      text: "Siz bu amalni ortga qaytara olmaysiz   !",
      icon: 'warning',
      iconColor: '#3085d6',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tasdiqlash',
      cancelButtonText: 'Bekor qilish'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(id)
      }
    })
  }

  const emptyRows = users.length > 3 ? 1 : 4;
  console.log(users)
  const isNotFound = users.length === 0;

  return (
    <>
      <Helmet>
        <title> Foydalanuvchilar | Nazoratchi Bot </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Foydalanuvchilar
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Yangi foydalanuvchi qo'shish
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD}/>
                <TableBody>
                  {users.map((user) => {
                    const { id, fullName, username, role } = user;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell component="th" scope="row" padding="normal">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={fullName} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {fullName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{username}</TableCell>

                        <TableCell align="left">
                          {role.includes('ADMIN') 
                            ?
                            <Label color={'success'}>
                              Secured
                            </Label>
                            :
                            <Label color={'error'}>
                              Unsecured
                            </Label>
                          }
                        </TableCell>

                        <TableCell align="left">
                          <Label color={'success'}>
                            {role}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" disabled={role.includes('ADMIN')} color="inherit" onClick={() => showDeleteAlert(id)}>
                            <Delete color='error'/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Foydalanuvchilar topilmadi
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{'filterName'}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
