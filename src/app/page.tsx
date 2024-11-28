'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const handleViewLocationsRedirect = () => {
    router.push('/view-locations');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#e3f2fd', // Fundo azul claro
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h3" color="primary" gutterBottom>
        Bem-vindo ao BDASA
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        Sua solução para gerenciar localizações e dados da água. Clique abaixo para começar.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleLoginRedirect}
          sx={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Ir para Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleViewLocationsRedirect}
          sx={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Visualizar Localizações
        </Button>
      </Stack>
    </Box>
  );
}