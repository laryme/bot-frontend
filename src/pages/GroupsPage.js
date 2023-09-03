import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import axios from 'axios';
// components
import { ProductSort, GroupList, ProductFilterSidebar } from '../sections/@dashboard/products';



// ----------------------------------------------------------------------

export default function GroupsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [groups, setGroups] = useState([]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() =>{
    const apiUrl = 'http://laryme.jprq.live/api/v1/groups';
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

  return (
    <>
      <Helmet>
        <title> Dashboard: Guruhlar | Nazoratchi Bot </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Guruhlar
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <GroupList groups={groups} />
      </Container>
    </>
  );
}
