'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  List,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';

export default function ViewLocationsPage() {
  const [locations, setLocations] = useState<any[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
  const [filterName, setFilterName] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/api/locations');
        setLocations(response.data);
        setFilteredLocations(response.data); // Inicializa o filtro com todos os dados
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar as localizações.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleFilterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setFilterName(value);

    // Filtra as localizações com base no nome
    const filteredByName = locations.filter((loc) =>
      loc.localName.toLowerCase().includes(value)
    );

    // Aplica os dois filtros (nome e data)
    const finalFiltered = filteredByName.filter((loc) =>
      filterDate ? loc.date.startsWith(filterDate) : true
    );

    setFilteredLocations(finalFiltered);
  };

  /* const handleFilterDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterDate(value);

    // Filtra as localizações com base na data
    const filteredByDate = locations.filter((loc) =>
      loc.date.startsWith(value)
    );

    // Aplica os dois filtros (data e nome)
    const finalFiltered = filteredByDate.filter((loc) =>
      filterName ? loc.localName.toLowerCase().includes(filterName) : true
    );

    setFilteredLocations(finalFiltered);
  }; */

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#e3f2fd',
        padding: 3,
        marginTop: { xs: 1, sm: 4 }, // Ajusta o espaço entre o menu e o conteúdo
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '800px',
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom align="center">
          Localizações Registradas
        </Typography>

        {/* Filtro por Nome */}
        <TextField
          label="Filtrar por Nome"
          variant="outlined"
          fullWidth
          value={filterName}
          onChange={handleFilterNameChange}
          sx={{ marginBottom: 2 }}
        />

        {/* Filtro por Data */}
        <TextField
          label="Filtrar por Data"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true, // Garante que a label fique acima do campo
          }}
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
            <Typography sx={{ marginLeft: 2 }}>Carregando...</Typography>
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : filteredLocations.length === 0 ? (
          <Typography align="center">Nenhuma localização encontrada.</Typography>
        ) : (
          <List>
            {filteredLocations.map((loc, index) => (
              <Card key={index} sx={{ marginBottom: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {loc.localName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Coordenadas: </strong>
                    <a
                      href={`https://www.google.com/maps?q=${loc.location.latitude},${loc.location.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#1976d2',
                        textDecoration: 'underline',
                        marginLeft: 8,
                      }}
                    >
                      ({loc.location.latitude}, {loc.location.longitude})
                    </a>
                  </Typography>
                  <Typography variant="body2">
                    <strong>PH:</strong> {loc.ph}, <strong>Oxigenação:</strong> {loc.oxygenation} mg/L
                  </Typography>
                  <Typography variant="body2">
                    <strong>Umidade do Solo:</strong> {loc.soilHumidity}%,{' '}
                    <strong>Umidade do Ar:</strong> {loc.airHumidity}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Data de Cadastro:</strong> {new Date(loc.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}