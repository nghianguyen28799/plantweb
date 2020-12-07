var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    userId: String,
    messages: Array
});

var Chat = mongoose.model('Chat', chatSchema, 'chat');

module.exports = Chat