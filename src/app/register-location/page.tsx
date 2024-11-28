'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

export default function RegisterLocationPage() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [localName, setLocalName] = useState('');
  const [ph, setPh] = useState('');
  const [oxygenation, setOxygenation] = useState('');
  const [soilHumidity, setSoilHumidity] = useState('');
  const [airHumidity, setAirHumidity] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingLocalName, setLoadingLocalName] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
          setLoadingLocation(false);

          // Captura automaticamente o nome da localidade
          await fetchLocalName(coords.latitude, coords.longitude);
        },
        () => {
          setMessage('Não foi possível capturar a localização.');
          setLoadingLocation(false);
        }
      );
    } else {
      setMessage('Geolocalização não é suportada neste navegador.');
      setLoadingLocation(false);
    }
  }, []);

  const fetchLocalName = async (latitude: number, longitude: number) => {
  try {
    setLoadingLocalName(true);
    const apiKey = '9ffbd038e8c94cc19935ac44e5c89254'; // Substitua pela sua chave
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
    );

    if (response.data && response.data.results.length > 0) {
      const components = response.data.results[0].components;
      const { city, town, village, state } = components;

      const locationName = `${city || town || village || 'Desconhecido'}, ${state || ''}`.trim();
      setLocalName(locationName);
    } else {
      setMessage('Não foi possível determinar o nome da localidade.');
    }
  } catch (error) {
    console.error('Erro ao capturar o nome da localidade:', error);
    setMessage('Erro ao capturar o nome da localidade.');
  } finally {
    setLoadingLocalName(false);
  }
};

  const handleRegister = async () => {
    if (!location || !localName) {
      setMessage('Localização ou nome do local não foram fornecidos. Tente novamente.');
      return;
    }

    const currentDate = new Date().toISOString();

    try {
      const newData = {
        localName,
        location,
        ph,
        oxygenation,
        soilHumidity,
        airHumidity,
        date: currentDate,
      };

      await axios.post('/api/locations', newData);

      setMessage('Localização registrada com sucesso!');
      setLocalName('');
      setPh('');
      setOxygenation('');
      setSoilHumidity('');
      setAirHumidity('');
    } catch (error) {
      console.error('Erro ao registrar a localização:', error);
      setMessage('Erro ao registrar a localização. Tente novamente.');
    }
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
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '600px',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h4" color="primary" align="center">
          Registrar Localização
        </Typography>

        {loadingLocation ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
            <Typography sx={{ marginLeft: 2 }}>Obtendo localização...</Typography>
          </Box>
        ) : (
          <>
            {location && (
              <Typography>
                Localização Capturada: {location.latitude}, {location.longitude}
              </Typography>
            )}
            {loadingLocalName ? (
              <Typography>Capturando nome da localidade...</Typography>
            ) : (
              <TextField
                label="Nome do Local"
                variant="outlined"
                fullWidth
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
              />
            )}
            <TextField
              label="PH da Água"
              variant="outlined"
              fullWidth
              type="number"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
            />
            <TextField
              label="Oxigenação da Água (mg/L)"
              variant="outlined"
              fullWidth
              type="number"
              value={oxygenation}
              onChange={(e) => setOxygenation(e.target.value)}
            />
            <TextField
              label="Umidade do Solo (%)"
              variant="outlined"
              fullWidth
              type="number"
              value={soilHumidity}
              onChange={(e) => setSoilHumidity(e.target.value)}
            />
            <TextField
              label="Umidade do Ar (%)"
              variant="outlined"
              fullWidth
              type="number"
              value={airHumidity}
              onChange={(e) => setAirHumidity(e.target.value)}
            />
              <TextField
                label="Outros Dados"
                variant="outlined"
                fullWidth
                type="text"
                value={airHumidity}
              />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleRegister}
            >
              Registrar
            </Button>
            {message && (
              <Typography variant="body2" color="error" align="center">
                {message}
              </Typography>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}