import { Stack, Typography, Input, Container, InputLabel, NativeSelect, FormControlLabel, Switch, Button, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import Iconify from '../components/iconify';
import PostButtonItem from '../sections/@dashboard/post/PostButtonItem';


export default function PostCreatePage() {

    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('1')
    const toolbarOptions = [['bold', 'italic', 'underline', 'strike'], ['link', 'image'], ['clean']];
    const [buttons, setButtons] = useState([]);

  const handleClick = () => {
    Swal.fire({
      title: 'Yangi tugma yaratish',
      html: `<input type="text" id="name" class="swal2-input" placeholder="Tugma nomi">
             <input type="password" id="link" class="swal2-input" placeholder="Tugma linki">
             <br>
             <select id="type" name="type" class="swal2-select">
                <option value="1">Medium</option>
                <option value="2">Large</option>
             </select>`,
      confirmButtonText: 'Yaratish',
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value
        const link = Swal.getPopup().querySelector('#link').value
        const type = Swal.getPopup().querySelector('#type').value
        if (!name || !link || !type) {
          Swal.showValidationMessage(`Please enter login and password`)
        }
        return { n: name, l: link, p:type }
      }
    }).then((result) => {
      console.log(result)
      const name = result.value.n
      const link = result.value.l
      const type = result.value.p

      const button = {
        name,
        link,
        type
      }

      setButtons([...buttons, button])
    })
   }

    const module = {
        toolbar: toolbarOptions,
    };

    const buttonClick = () => {
      console.log('Hello world')
      console.log(title);
      console.log(value);
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
            <Input type="text" label="p-1" value={title} onChange={setTitle}/>
        </Stack>

        <Stack direction="column" alignItems="left" mb={5} width={250}>
          <InputLabel htmlFor="uncontrolled-native">
            Post turi
          </InputLabel>
          <NativeSelect value={type} onChange={(e) => setType(e.target.value)} inputProps={{name: 'type', value: type, id: 'uncontrolled-native'}}>
              <option value={1}>Matnli</option>
              <option value={2}>Rasm va matnli</option>
              <option value={3}>Video va matnli</option>
          </NativeSelect>
        </Stack>
        
        
        <Stack direction="column" mt={5} mb={5}>
          <Typography mb={2}>Post matni</Typography>
          <ReactQuill modules={module} module="QuillMarkdown" theme="snow" value={value} onChange={setValue}/>
        </Stack>

        <Stack width={800} direction="row" flexWrap="wrap" mb={5}>
            {buttons.map((button, index) => (
                <PostButtonItem key={index} button={button} index={index} onDelete={() => handleDelete(index)}/>
            ))}
        </Stack>

        <Stack direction="row" mb={5} spacing={2} width={400}>
          <Button size="medium" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClick}>
            Yangi tugma qo'shish
          </Button>
          {type !== '1' &&
            <Button variant="contained" component="label">
              Fayl yuklash
              <input type="file" id="fileInput" hidden/>
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