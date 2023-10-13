import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Container, Typography } from '@mui/material';
import axios from 'axios';
// components
import { GroupList } from '../sections/@dashboard/products';
import { API_BASE_URL } from '../utils/config';


// ----------------------------------------------------------------------

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() =>{
    const apiUrl = `${API_BASE_URL}/groups`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
      }
    };

    axios.get(apiUrl, config)
        .then(response => {
          const {data} = response.data
          console.log(data.content)
          setGroups(data.content);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
  },[]);

  const isEmpty = groups.length === 0;

  return (
    <>
      <Helmet>
        <title> Dashboard: Guruhlar | Nazoratchi Bot </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Guruhlar
        </Typography>

        <GroupList groups={groups} /> 

        { isEmpty && 
          <Typography variant="h3" align='center' alignItems={'center'} alignContent={'center'} mt={14}>Guruhlar mavjud emas</Typography>
        }
      </Container>
    </>
  );
}
