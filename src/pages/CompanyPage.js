import { Container, Stack, Typography, Button, Card, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";

import Iconify from "../components/iconify/Iconify";

export default function CompanyPage() {
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
           <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
             Add
           </Button>
         </Stack>
         <Box>
            <Typography>Hello</Typography>
         </Box>
       </Container>
    </>
  )
}