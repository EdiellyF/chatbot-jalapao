import React, { useState, KeyboardEvent, ChangeEvent, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';

import { api } from "../services/axios";


const StyledPaper = styled(Paper)({
  width: '90%',
  maxWidth: '900px',
  height: '600px', 
  minHeight: '600px',
  maxHeight: '600px',
  backgroundColor: '#e8f5e9',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden', // Impede crescimento extra
});



const StyledListItemText = styled(ListItemText)<{ from: string }>(({ from }) => ({
  textAlign: from === 'bot' ? 'right' : 'left',
  backgroundColor: from === 'bot' ? '#1976d2' : '#388e3c',
  color: 'white',
  padding: '10px',
  borderRadius: '8px',
    maxWidth: '400px', // Define uma largura fixa
  display: 'inline-block',
  margin: '2px',
  whiteSpace: 'normal', 
  overflowWrap: 'break-word', 
  wordBreak: 'break-word', 
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
      const response = await api.post('/api/chat', { message: msg });
      
      const botReply = response.data.response|| 'Não entendi, pode repetir?';

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
    }
  }
};

  return (
    <>
      

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <StyledPaper elevation={3}>
            <List sx={{ height: 'calc(100% - 100px)', overflowY: 'auto', mb: 2 }}>
              {chat.map((c, i) => (
                <ListItem key={i}>
                  <StyledListItemText from={c.from} primary={c.msg} />
                  <ListItemText sx={{ fontSize: '0.8rem', textAlign: c.from === 'bot' ? 'left' : 'right' }} secondary={`às ${c.time}`} />
                </ListItem>
              ))}
              <div ref={chatEndRef}></div>
            </List>

            <Divider />
            <Grid container spacing={1} sx={{ pt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Digite uma mensagem..."
                  variant="outlined"
                  value={message}
                  onChange={handleChange}
                  onKeyDown={keyPress}
                  sx={{ height: '80px'}} 
                />
              </Grid>
              <Grid item xs={1} display="flex" justifyContent="flex-end">
                      <Fab color="success" onClick={() => addMessage('user', message)} aria-label="send">
                        <SendIcon />
                      </Fab>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
