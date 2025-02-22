const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
z