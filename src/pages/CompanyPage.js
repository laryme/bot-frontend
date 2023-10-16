import { useCallback, useEffect, useState } from "react";
import { Container, Stack, Typography, Button, Card, TableContainer, Table, TableBody, TableRow, Paper, TableCell, Avatar, IconButton, CardHeader, Divider, CardContent, TextField, CardActions } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Delete } from "@mui/icons-material";
import axios from "axios";

import Scrollbar from "../components/scrollbar";
import { API_BASE_URL } from '../utils/config';
import { UserListHead } from "../sections/@dashboard/user";
import Iconify from "../components/iconify/Iconify";


const TABLE_HEAD = [
    { id: 'name', label: 'ISM', alignRight: false },
    { id: '', label: 'O\'CHIRISH', alignRight: true },
];



export default function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const [addInstance, setAddInstance] = useState(false);
  const [bot, setBot] = useState({
    name: '',
    baseUrl: '',
  });

  useEffect(() => {
    const apiUrl = `${API_BASE_URL}/companies`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
      }
    };
    
    axios.get(apiUrl, config)
        .then(response => {
          const {data} = response.data
          console.log(data)
          setCompanies(data);
        })
        .catch(error => {
            console.error('Error fetching companies:', error);
        });
  }, []);

  const addNewInstance = () => {
    const apiUrl = `${API_BASE_URL}/companies`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
      }
    };

    axios.post(apiUrl,bot, config)
        .then(response => {
          addInstance(false)
        })
        .catch(error => {
            console.error('Error posting bot:', error);
        });

  }

  const handleDetailChange = useCallback(
    (event) => {
      setBot((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const deleteBotInstance = (id) => {
    const apiUrl = `${API_BASE_URL}/companies/${id}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
      }
    };

    axios.delete(apiUrl, config)
        .then(r => {
          addInstance(false)
        })
        .catch(error => {
            console.error('Error posting bot:', error);
        });
  }

  const isNotFound = companies.length === 0;
  const emptyRows = companies.length > 0 ? companies.length > 4 ? 1 : 4 : 0;

  return (
    <>
       <Helmet>
        <title> Bot Instances | Nazoratchi Bot </title>
       </Helmet>

       <Container>
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
           <Typography variant="h4" gutterBottom>
             Bot Instances
           </Typography>
           { !addInstance && (
             <Button variant="contained" onClick={() => setAddInstance(true)} startIcon={<Iconify icon="eva:plus-fill" />}>
               Add
             </Button>
           )}

           { addInstance && (
             <Button variant="contained" onClick={() => setAddInstance(false)} startIcon={<Iconify icon="ep:back" />}>
               Back
             </Button>
           )}
           
         </Stack>

         { !addInstance && (
           <Card>
           <Scrollbar>
             <TableContainer sx={{ minWidth: 800 }}>
               <Table>
                 <UserListHead headLabel={TABLE_HEAD}/>
                 <TableBody>
                   {companies.map((company) => {
                     const { id, name } = company;
 
                     return (
                       <TableRow hover key={id} tabIndex={-1}>
                         <TableCell component="th" scope="row" padding="normal">
                           <Stack direction="row" alignItems="center" spacing={2}>
                             <Avatar alt={name} src={"avatarUrl"} />
                             <Typography variant="subtitle2" noWrap>
                               {name}
                             </Typography>
                           </Stack>
                         </TableCell>
 
                         <TableCell align="right">
                           <IconButton size="large" onClick={() => deleteBotInstance(id)}>
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
                           <Paper sx={{ textAlign: 'center', }}>
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
         )}
         
          { addInstance && (
            <Card>
              <CardHeader
                title="Yangi bot malumotlarini kiriting"
                subheader="New Instace"
              />
            <Divider />
            <CardContent>
              <Stack
                spacing={3}
                sx={{ maxWidth: 400 }}
              >
                <TextField
                  fullWidth
                  label="Nomi"
                  name="name"
                  onChange={handleDetailChange}
                  type="text"
                  value={bot.name}
                />
                <TextField
                  fullWidth
                  label="Base url"
                  name="baseUrl"
                  onChange={handleDetailChange}
                  type="text"
                  value={bot.baseUrl}
                />
              </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => addNewInstance()}>
                Qo'shish
              </Button>
            </CardActions>
          </Card>
          )}
       </Container>
    </>
  )
}