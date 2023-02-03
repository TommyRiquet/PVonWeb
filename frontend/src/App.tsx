// Description: This is the main component of the application. It is the parent of all other components.

// Import Styles
import './assets/styles/App.scss';

// Import Pages
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';

// Import Components
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { io } from "socket.io-client";

import { useEffect } from 'react';


function App() {

  useEffect(() => {
    const socket = io("http://localhost:3001", {path: '/api/socket.io'});
    socket.on("connect", () => {
      console.log("Connected to server");
    });

  }, []);

 return (
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Home/>}/>

      {/* When no route has been found */}
      <Route path="*" element={<Error/>}/>
  </Routes>
</BrowserRouter>
 )
}

export default App;
