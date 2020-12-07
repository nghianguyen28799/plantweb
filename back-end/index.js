require('dotenv').config();

// SERVER

const express = require('express')
const app = express();
const port = process.env.PORT || 9000;
const socketio = require('socket.io')
const http = require('http');

const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

// MONGOODB

require('./config/mongo')

// SOCKET

const { addUser, removeUser, getUser, getUserinRoom } = require('./users');

const server = http.Server(app);
const io = socketio(server, {
  cors:true,
  // origins:["http://127.0.0.1:3000"],
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', ({ userId, name, room }, callback) => {
      const {error, user} = addUser({id: socket.id, userId, name, room });

      // if(error) return callback(error);
      // console.log(user);

      socket.emit('message', { name: 'admin', text: `${user.name}, welcome to the room ${user.room }` })
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`});

      socket.join(user.room);
      
      io.to(user.room).emit('roomData', { room: user.room, users: getUserinRoom(user.room)})
      callback();

    })

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit('message', { id: user.userId, name: user.name, text: message});
      io.to(user.room).emit('roomData', { room: user.room, users: getUserinRoom(user.room)})

      callback();
    })

    socket.on('disconnect', () => {
      console.log('user disconnected');
      const user = removeUser(socket.id);

      if(user) {
        io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`})
      }
    });
});


// ROUTE

const { ProductsRoute, UsersRoute, CartRoute, OrderRoute, WishlistRoute, ChatRoute, VoucherRoute } = require('./routes/index.route');

app.use('/product', ProductsRoute)
app.use('/users', UsersRoute);
app.use('/cart', CartRoute);
app.use('/order', OrderRoute);
app.use('/wishlist', WishlistRoute);
app.use('/voucher', VoucherRoute);
app.use('/chat', ChatRoute);

server.listen(port, function() {
    console.log('Server listening on port ' + port);
});
