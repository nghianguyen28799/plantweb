const express = require('express')
const Chat = express.Router()

const controller = require('../controllers/chat.controller');

Chat.get('/', controller.show)

Chat.get('/showChat/:id', controller.showChat);

Chat.post('/sendMessage', controller.sendMessage);

Chat.post('/createIdChat', controller.createIdChat);

module.exports = Chat
