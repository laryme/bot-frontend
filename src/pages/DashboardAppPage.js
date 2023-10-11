import { Helmet } from 'react-helmet-async';
// @mui

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { API_BASE_URL } from '../utils/config';
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [stats, setStats] = useState({
    userCount : 0,
    activeUsers : 0,
    passiveUser : 0,
    groupCount : 0,
    dailyParticipation : {
      dates : [
        '2023-01-05',
        '2023-01-06',
        '2023-01-07',
        '2023-01-08',
        '2023-01-09',
        '2023-01-10',
        '2023-01-11',
      ],
      count : [
        100,
        22, 
        37, 
        21, 
        44, 
        22, 
        30
      ]
    },
    activeGroups : [
      { label: 'America', value: 4344 },
      { label: 'Asia', value: 5435 },
      { label: 'Europe', value: 1443 },
      { label: 'Africa', value: 4443 },
    ]

  });

  useEffect(() =>{
    const apiUrl = `${API_BASE_URL}/users/stats`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
      }
    };

    axios.get(apiUrl, config)
        .then(response => {
          const {data} = response.data
          setStats(data);
          // console.log(data.dailyParticipation.dates)
        })
        .catch(error => {
            console.error('Error fetching stats:', error);
        });
  },[]);

  console.log(stats)

  return (
    <>
      <Helmet>
        <title> Boshqaruv paneli | Nazoratchi bot </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Boshqaruv paneli
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Foydalanuvchi ID lari" total={stats.userCount} icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Faol foydalanuvchilar" total={stats.activeUsers} color="info" icon={'ant-design:user-switch-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Passiv foydalanuvchilar" total={stats.passiveUser} color="warning" icon={'ant-design:user-add-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Guruhlar" total={stats.groupCount} color="error" icon={'ant-design:user-group-add-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Kunlik azo bo'lishlar"
              subheader="oxirgi bir haftadagi malumotlar"
              chartLabels={stats.dailyParticipation.dates}
              chartData={[
                {
                  name: 'OPERATOR BOT',
                  type: 'column',
                  fill: 'solid',
                  data: stats.dailyParticipation.count,
                }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Faol guruhlar"
              chartData={stats.activeGroups}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
