const port = process.env.PORT || 9000;
const express = require('express')
const app = express();
const socketio = require('socket.io')
const http = require('http');

const server = http.Server(app);
const io = socketio(server, {
  cors:true,
  origins:["http://127.0.0.1:7902"],
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

module.exports = io
