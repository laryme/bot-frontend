import { Button, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Iconify from "../components/iconify";

export default function BlogPage() {
    return (
        <>
          <Helmet>
            <title>Dashboard: Yangi post yaratish</title>
          </Helmet>

          <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
                Yangi post yaratish
          </Typography>
        </Stack>
          </Container>
        </>
    );}