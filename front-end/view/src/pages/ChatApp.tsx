import  '../styles/aks.css'

import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent} from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useMediaQuery } from '@mui/material';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';
import {Typography } from "@mui/material"

import { api } from "../services/axios";

const StyledPaper = styled(Paper)({
  width: '100vw',
  height: '100vh', 
  background:   ' linear-gradient(135deg,rgb(255, 255, 255),rgb(209, 235, 217))',

  borderRadius: '0', 
  boxShadow: 'none', 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  overflow: 'hidden',
});





const StyledListItemText = styled(ListItemText)<{ from: string }>(({ from }) => ({
  textAlign: from === 'bot' ? 'left' : 'right',
  backgroundColor: from === 'bot' ? '#e3e3e3' : '#0078ff', // Tons mais suaves
  color: from === 'bot' ? '#000000' : '#ffffff',
  padding: '14px 18px',
  borderRadius: from === 'bot' ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
  maxWidth: '65%',
  display: 'inline-block',
  transition: 'all 0.3s ease-in-out',
  marginLeft: from === 'bot' ? '0' : 'auto',
  marginRight: from === 'bot' ? 'auto' : '0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  fontSize: '1rem',
  lineHeight: '1.4',
}));

type Message = {
  from: 'bot' | 'user';
  msg: string;
  time: string;
};

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  
 const isMobile= useMediaQuery('(max-width:600px)');

 
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const keyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addMessage('user', message);
    }
  };

  const addMessage = async (from: 'bot' | 'user', msg: string) => {
    if (msg.trim() === '') return;
    const time = new Date().toLocaleTimeString().slice(0, 5);
    const userMessage = { from, msg, time };
    

    setChat((prevChat) => [...prevChat, userMessage]);
    setMessage('');

    if (from === 'user') {
      try {
         setLoading(true);
        const response = await api.post('/api/chat', { message: msg });
        setLoading(true);
        const botReply = response.data.response || 'Não entendi, pode repetir?';

        const botMessage: Message = {
          from: 'bot',
          msg: botReply,
          time: new Date().toLocaleTimeString().slice(0, 5),
        };
        setChat((prevChat) => [...prevChat, botMessage]);
      } catch (error) {
        console.error("Erro ao enviar mensagem para a API:", error);
        setChat((prevChat) => [...prevChat, {
          from: 'bot',
          msg: 'Erro ao comunicar com o servidor.',
          time: new Date().toLocaleTimeString().slice(0, 5),
        }]);
      }  finally {
      setLoading(false);
    }
    }
  };

  const clickSugerionQuestion = (event: React.MouseEvent<HTMLButtonElement>) => {
       const valor = event.currentTarget.innerText;
       setMessage(valor);
  }

  
  const perguntasComuns = ['Quais municípios fazem parte da APA Jalapão?','Qual é a área total da APA Jalapão?', 'Qual é o símbolo artesanal do Jalapão?']

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh',  width: '100vw'  }}>

   

      <StyledPaper>       
        
          {isMobile ?   
            <Box sx={{width: '100vw', height: '200px', overflow: 'hidden' }}>
                    <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxtfwcM9laH3oOBp0P3IH-_SQ2_6IzzQJ08g&s" 
                    alt="Jalapão" 
                    style={{  width: '100vw', height: '90%', objectFit: 'cover',  borderRadius: '0 0 12px 12px'}} />
            </Box> 
              :
                <Box sx={{ width: '100%', height: '100px', overflow: 'hidden', border:'10%', textAlign: 'center', marginTop: '20px'}}>  
                   <Typography variant="h4" sx={{ fontFamily: "'Merriweather', serif", fontWeight: 'bold', color: '#4caf50', animation: 'fadeIn 0.5s ease-in' }}>
                          Bem-vindo ao Chat Jalapão! 🌿
                        </Typography>
                  </Box> 
           }


            <Box sx={{display: 'flex',  flexDirection: !isMobile ? 'row' : 'column', justifyContent: 'space-between', margin: ' 0 1rem', gap: '1rem'}}>
                {perguntasComuns.map((chat, index) => (
                     <Fab className='aks' variant="extended" color="success" onClick={clickSugerionQuestion} key={index}>
                                        {chat}
                     </Fab>
                ))} 
            </Box>
          

        <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: '80vh', padding: '10px' }}>
          <List>
            {chat.map((c, i) => (
              <ListItem key={i} sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: c.from === 'bot' ? 'flex-start' : 'flex-end',
                width: '100%'
              }}>
                
                <StyledListItemText from={c.from} primary={c.msg} />
                <ListItemText 
                  sx={{ 
                    fontSize: '0.7rem', 
                    color: '#666',
                    textAlign: c.from === 'bot' ? 'left' : 'right',
                    width: '100%',
                    
                  }} 
                  secondary={`às ${c.time}`} 
                />
              </ListItem>
            ))}

               {loading && (
                    <ListItem
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '100%',
                      }}
                    >
                      <StyledListItemText from="bot" primary="🤔 Pensando..." />
                    </ListItem>
                  )}

            <div ref={chatEndRef}></div>
          </List>
    
             
        </Box>



        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            padding: 2, 
            flexWrap: 'wrap' 
          }}
        >
          <TextField
            fullWidth
            placeholder="Digite uma mensagem..."
            variant="outlined"
            value={message}
            onChange={handleChange}
            onKeyDown={keyPress}
            sx={{ 
              flex: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                backgroundColor: '#f0f2f5',
              }
            }}
          />
          <Fab 
            color="primary" 
            onClick={() => addMessage('user', message)} 
            aria-label="send"
            sx={{ 
              
              background: '#4CAF50' ,
              width: 48,
              height: 48,
              minHeight: 48,
              boxShadow: '0 2px 8px rgba(201, 185, 185, 0.1)',
              flexShrink: 0
            }}
          >
            <SendIcon />
          </Fab>
        </Box>
      </StyledPaper>
    </Grid>
  );
};

export default Chat;
