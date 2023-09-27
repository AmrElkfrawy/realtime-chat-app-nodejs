const http = require('http');
const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const socketIO = require('socket.io');

dotenv.config({ path: './.env' });

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('A new user connected');
  socket.on('disconnect', (socket) => {
    console.log('User was disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Server listening on port', port);
});
