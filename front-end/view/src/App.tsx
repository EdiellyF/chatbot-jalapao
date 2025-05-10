
import './App.css'
import { Home } from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Chat from './pages/ChatApp';


function App() {


  return (
    <>

        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chat" element={ <Chat></Chat>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
