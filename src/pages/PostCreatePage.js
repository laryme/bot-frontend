import { Stack, Typography, Input, Container, InputLabel, NativeSelect, Button } from "@mui/material";
import { Helmet } from "react-helmet-async";
import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Iconify from '../components/iconify';
import PostButtonItem from '../sections/@dashboard/post/PostButtonItem';


export default function PostCreatePage() {

    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('0')
    const toolbarOptions = [['bold', 'italic', 'underline', 'strike'], ['link'], ['clean']];
    const [buttons, setButtons] = useState([]);
    const [file, setFile] = useState()
    const navigate = useNavigate();


  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  const showToast = (success, message) => {
    Toast.fire({
      icon: success,
      title: message
    })
  }

  const handleClick = () => {
    Swal.fire({
      title: 'Yangi tugma yaratish',
      html: `<input type="text" id="name" class="swal2-input" placeholder="Tugma nomi">
             <input type="text" id="link" value="https://" class="swal2-input" placeholder="Tugma linki">
             <br>
             <select id="type" name="type" class="swal2-select">
                <option value="MEDIUM">O'rtacha</option>
                <option value="LARGE">Katta</option>
             </select>`,
      confirmButtonText: 'Yaratish',
      focusConfirm: false,
      preConfirm: () => {
        const n = Swal.getPopup().querySelector('#name').value
        const l = Swal.getPopup().querySelector('#link').value
        const t = Swal.getPopup().querySelector('#type').value
        if (!n || !l || !t) {
          Swal.showValidationMessage(`Please enter login and password`)
        }
    
        return { n, l, t }
      }
    }).then((result) => {
      const tempName = result.value.n
      const tempLink = result.value.l
      const tempType = result.value.t

      // const l = buttons.length;
      // if(l > 1){
      //   if(tempType === 'LARGE'){
      //     if(buttons[l-1].type !== 'MEDIUM' || buttons[l-2].type !== 'MEDIUM'){
      //       showToast('error', 'Tugma kombinatsiyasi noto\'g\'ri');
      //       return;
      //     }
      //   }
      // } else if(l === 1 && tempType === 'LARGE' && buttons[l-1].type === 'MEDIUM') {
      //   showToast('error', 'Tugma kombinatsiyasi noto\'g\'ri');
      //   return;
      // }
      

      const button = {
        name: tempName,
        link: tempLink,
        type: tempType,
      }

      console.log(button)

      setButtons([...buttons, button])
      console.log(buttons)

    })
   }

    const module = {
        toolbar: toolbarOptions,
    };

    const buttonClick = () => {

      if(type === '0'){
        if(!title || !value){
          showToast('error', 'Majburiy maydonlar to\'ldirilmagan')
          return;
        }
      } else if(!title || !value || !file){
        showToast('error', 'Majburiy maydonlar to\'ldirilmagan')
        return;
      }

      const data = {
        title,
        body: value,
        buttons,
        postType: type
      }

      const apiUrl = 'https://api.larydev.uz/api/v1/posts';
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `${localStorage.getItem('token-type')}${localStorage.getItem('access-token')}`
        }
      };

      axios.post(apiUrl, {
        post : JSON.stringify(data),
        file
      }, config)
        .then(response => {
          navigate('/dashboard/post', {replace : true})
        })
        .catch(error => {
            console.error('Error post:', error);
            showToast('error', 'Muammo sodir bo\'ldi')
        });
    }

    const handleDelete = (index) => {
      const newButtons = buttons.filter((button, i) => i !== index);
      setButtons(newButtons);
    };

    return (
      <>
      <Helmet><title>Post | Nazoratichi Bot</title></Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Yangi post yaratish
              </Typography>
        </Stack>
        <Stack spacing={3} mb={5}>
            <InputLabel label="p-1">Post sarlavhasini kiriting</InputLabel>
            <Input type="text" label="p-1" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </Stack>

        <Stack direction="column" alignItems="left" mb={5} width={250}>
          <InputLabel htmlFor="uncontrolled-native">
            Post turi
          </InputLabel>
          <NativeSelect value={type} onChange={(e) => setType(e.target.value)} inputProps={{name: 'type', value: type, id: 'uncontrolled-native'}}>
              <option value={0}>Matnli</option>
              <option value={1}>Rasm va matnli</option>
              <option value={2}>Video va matnli</option>
              {/* <option value={3}>Aylana video</option> */}
          </NativeSelect>
        </Stack>
        
        
        <Stack direction="column" mt={5} mb={5}>
          <Typography mb={2}>Post matni</Typography>
          <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />
        </Stack>

        <Stack width={800} direction="row" flexWrap="wrap" mb={5}>
            {buttons.map((button, index) => (
                <PostButtonItem key={index} button={button} onDelete={() => handleDelete(index)}/>
            ))}
        </Stack>

        <Stack direction="row" mb={5} spacing={2} width={400}>
          <Button size="medium" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClick}>
            Yangi tugma qo'shish
          </Button>
          {type !== '0' &&
            <Button variant="contained" component="label">
              Fayl yuklash
              <input type="file" id="fileInput" hidden onChange={(e) => setFile(e.target.files[0])}/>
            </Button>
          }
        </Stack>
        
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Button fullWidth size="large" type="submit" variant="contained" onClick={buttonClick}>
            Tasdiqlash
          </Button> 
        </Stack>
      </Container>
      </>
    );}