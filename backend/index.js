import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { createServer } from 'http';





const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',   
        methods: ['GET', 'POST'],
        credentials: true, 
    },
});


app.get('/', (req, res) => {
    res.send('Hello World!');
    }
    );

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
});



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);  
    });