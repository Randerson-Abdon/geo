'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Ícone de voltar

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.status === 200) {
        router.push('/register-location');
      }
    } catch {
      setError('Usuário ou senha inválidos.');
    }
  };

  const handleGoHome = () => {
    router.push('/'); // Redireciona para a página inicial
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#e3f2fd',
        padding: 2,
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: { xs: '90%', sm: 400 }, // Ajusta a largura para telas menores
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center" color="primary" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField
          label="Usuário"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{
            '&:hover': {
              backgroundColor: '#1565c0', // Alteração de cor no hover
            },
          }}
        >
          Entrar
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={handleGoHome}
          startIcon={<ArrowBackIcon />} // Adiciona o ícone antes do texto
          sx={{
            '&:hover': {
              backgroundColor: '#bbdefb', // Alteração de cor no hover
            },
          }}
        >
          Voltar para Home
        </Button>
        {error && (
          <Typography
            color="error"
            align="center"
            sx={{
              mt: 2,
              fontWeight: 'bold',
            }}
          >
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}