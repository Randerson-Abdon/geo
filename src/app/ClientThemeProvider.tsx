'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul padrão
    },
    secondary: {
      main: '#ffffff', // Branco
    },
    background: {
      default: '#e3f2fd', // Fundo azul claro
    },
  },
});

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}