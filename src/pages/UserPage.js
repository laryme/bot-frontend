import { Helmet } from 'react-helmet-async';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
  TablePagination,
} from '@mui/material';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fullName', label: 'ISM', alignRight: false },
  { id: 'username', label: 'USERNAME', alignRight: false },
  { id: 'chatId', label: 'CHAT ID', alignRight: false },
  { id: 'status', label: 'STATUS', alignRight: false },
  { id: 'joinedDate', label: 'RO\'YXATDAN O\'TGAN VAQTI', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserPage() {

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [users, setUsers] = useState([]);

  const [totalUsers, setTotalUsers] = useState(0);

  const avatarUrl = '/assets/images/avatars/avatar_1.jpg'

  useEffect(() => {
    const apiUrl = 'https://api.larydev.uz/api/v1/users/bot-users';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
      },
      params: {
        page,
        size: rowsPerPage,
        order: 'asc',
        orderBy: 'fullName'
      }
    };
    // Fetch user data from the backend API
    axios.get(apiUrl, config)
        .then(response => {
          const {data} = response.data
          console.log(data.content)

          setUsers(data.content);
          setTotalUsers(data.totalElements)
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const onSearch = () => {

    const apiUrl = 'https://localhost:8081/api/v1/users/bot-users/search';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
      },
      params: {
        query: filterName
      }
    };
    // Fetch user data from the backend API
    axios.get(apiUrl, config)
        .then(response => {
          const {data} = response.data
          console.log(data.content)

          setUsers(data.content);
          setTotalUsers(data.totalElements)
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    // smth
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

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
          <Button variant="contained" startIcon={<Iconify icon="eva:download-fill" />}>
            Malumotlarni yuklab olish
          </Button>
        </Stack>

        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} onSearch={onSearch} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD}/>
                <TableBody>
                  {users.map((user) => {
                    const { id, fullName, username, chatId, status, joinedDate } = user;

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

                        <TableCell align="left">{chatId}</TableCell>

                        <TableCell align="left">
                          <Label color={(status ? 'success' : 'error') || 'success'}>{sentenceCase(status ? 'active' : 'inactive')}</Label>
                        </TableCell>

                        <TableCell align="left">{joinedDate}</TableCell>
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
                            <strong>&quot;{filterName}&quot;</strong>.
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalUsers}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
