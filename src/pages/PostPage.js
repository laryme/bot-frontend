import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography} from '@mui/material';


import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { BlogPostCard } from '../sections/@dashboard/blog';
// components
import Iconify from '../components/iconify';



// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function PostPage() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const apiUrl = 'https://api.larydev.uz/api/v1/posts';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
      }
    };

    

    // Fetch post data from the backend API
    axios.get(apiUrl, config)
        .then(response => {
          const {data} = response.data

          setPosts(data.content);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
  },[]);

  const handleTest = (id) => {
    Swal.fire({
      title: 'Test',
      text: "Post test sifatida yuborilsinmi?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yuborish'
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `https://api.larydev.uz/api/v1/posts/test/${id}`;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
          }
        };
        axios.get(apiUrl, config)
          .then(result => {
            Swal.fire(
              'Muvaffaqqiyatli',
              'Post muvaffaqqiyatli yuborildi',
              'success'
            )
          })
          .catch(error => {
            console.log(error.response)
            Swal.fire(
              'Xato',
              'Xatolik sodir bo\'ldi',
              'error'
            )
          });
      }
    })
  }

  const handleSend = (id, allGroups, allUsers) => {
    if(!allGroups && !allUsers){
      Swal.fire(
        'Xatolik',
        'Kamida bitta qabul qiluvchi tanlanishi kerak',
        'error'
      )
      return;
    }

    Swal.fire({
      title: 'Postni yuborish',
      text: "Bu amalni ortga qaytarib bo'lmaydi",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tasdiqlash'
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `https://api.larydev.uz/api/v1/posts/send/${id}`;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
          }
        };

        const sendOption = {
          allGroups,
          allUsers
        }

        axios.post(apiUrl, sendOption, config)
          .then(result => {
            Swal.fire(
              'Muvaffaqqiyatli',
              'Post yuborish jarayoni boshlandi',
              'success'
            )
          })
          .catch(error => {
            console.log(error.response)
            Swal.fire(
              'Xato',
              'Xatolik sodir bo\'ldi',
              'error'
            )
          });
      }
    })
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Postni o\'chirmoqchimisiz?',
      text: "Bu amalni ortga qaytarib bo'lmaydi",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'O\'chirish'
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `https://api.larydev.uz/api/v1/posts/${id}`;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
          }
        };
        axios.delete(apiUrl, config)
          .then(result => {
            setPosts(posts.filter((post) => post.id !== id))
            Swal.fire(
              'Muvaffaqqiyatli',
              'Post muvaffaqqiyatli o\'chirildi',
              'success'
            )
          })
          .catch(error => {
            console.log(error.response)
            Swal.fire(
              'Xato',
              'Xatolik sodir bo\'ldi',
              'error'
            )
          });
      }
    })
  }
  
// const isNotFound = posts.length === 0;

  return (
    <>
      <Helmet>
        <title> Dashboard: Postlar | Nazoratchi Bot </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={7}>
          <Typography variant="h4" gutterBottom>
            Postlar
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} href='/dashboard/post-create'>
            Yangi post yaratish
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} onTest={handleTest} onSend={handleSend} onDelete={handleDelete}  />
          ))}
        </Grid>
      </Container>
    </>
  );
}
