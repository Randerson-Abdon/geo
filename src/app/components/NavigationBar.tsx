'use client';

import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname(); // Obtém a rota atual
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica se o usuário está logado
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Limpa autenticação
    setIsLoggedIn(false); // Atualiza estado
    navigateTo('/'); // Redireciona para a home
  };

  // Condição para esconder o menu na página de login e home
  if (pathname === '/' || pathname === '/login') {
    return null; // Não renderiza o menu
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            flexGrow: { sm: 1 },
            cursor: 'pointer',
            marginBottom: { xs: 1, sm: 0 },
          }}
          onClick={() => navigateTo('/')}
        >
          Geo Water
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
          }}
        >
          {/* Botão de registro só é exibido se o usuário estiver logado */}
          {isLoggedIn && (
            <Button color="inherit" onClick={() => navigateTo('/register-location')}>
              REGISTRAR
            </Button>
          )}
          <Button color="inherit" onClick={() => navigateTo('/view-locations')}>
            CONSULTAR
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}