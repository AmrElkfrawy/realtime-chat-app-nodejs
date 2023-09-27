const http = require('http');
const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

dotenv.config({ path: './.env' });

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('A new user connected');

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app!')
  );

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New user joined!')
  );

  socket.on('createMessage', (message, callback) => {
    // Process the message
    const responseMessage = generateMessage(message.from, message.text);

    // Emit the message and provide data to the acknowledgment callback
    io.emit('newMessage', responseMessage);
    callback('This is the server acknowledgment'); // Pass data to the callback
  });

  socket.on('disconnect', (socket) => {
    console.log('User was disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server listening on port', port);
});
