import '../styles/home.css';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';

export const Home: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)'); // Detecta telas menores

  return (
    <Box
      sx={{
        minHeight: '100vh',
        textAlign: 'center',
        p: isMobile ? 2 : 4, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
  
      }}
    >
    
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '900px',  color: '#FFF' }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold">ChatJalapão</Typography>
      </Box>


      <Box sx={{ mt: 4, maxWidth: '600px', width: '90%' }}>
        <Typography variant={isMobile ? 'h4' : 'h2'} sx={{ color: '#FFF', fontWeight: 'bold' }}>
          Conecte-se com a magia do Jalapão!🌿
        </Typography>
        <Typography variant="body1" sx={{ color: '#A5D6A7', mt: 2 }}>
          Descubra curiosidades e explore a natureza com o ChatJalapão.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#4CAF50',
            mt: 4,
            px: 3,
            py: isMobile ? 1.5 : 2,
            fontSize: isMobile ? '1rem' : '1.2rem',
            borderRadius: 3,
            width: isMobile ? '80%' : 'auto', 
            '&:hover': { transform: 'scale(1.05)', transition: '0.3s ease-in-out' },
          }}
        >
          Iniciar Chat
        </Button>
      </Box>

      <Box sx={{ mt: 8, p: 2, backdropFilter: 'blur(8px)', borderRadius: 2, width: '100%', maxWidth: '600px' }}>
        <Typography variant="body2" sx={{ color: '#A5D6A7' }}>
          Copyright © 2025 ChatJalapão | Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
};
