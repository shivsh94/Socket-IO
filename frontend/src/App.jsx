import React, { use } from 'react';
import {io} from 'socket.io-client';
import { useEffect } from 'react';

const App = () => {

  const socket = io('http://localhost:3000');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
  }
  , []);



  return (
    <div>
      
    </div>
  );
}

export default App;
