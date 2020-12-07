const Chat = require("../models/chat.model");

module.exports = {

    show: (req, res) => {
        Chat.find()
        .then((data) => {
            res.json(data);
        })
    },

    showChat: (req, res) => {
        const userId = req.params.id;
        Chat.find({ userId: userId })
        .then((data) => {
            res.json(data);
        })
    },

    createIdChat: (req, res) => {
        const userId = req.body.userId;
        if(userId) {
            Chat.create({
                userId: userId,
                messages: []
            })    
        }
    },

    sendMessage: (req, res) => {
        const userId = req.body.userId;
        const message = req.body.message;
        const name = req.body.name;
        console.log(message, name);
        Chat.find({ userId: userId })
        .then((data) => {
            const condition = {
                userId: userId
            };
            const process = {
                messages: data[0] .messages.concat({id: userId, name: name, text: message})  
            }
            
            Chat.updateOne(condition, process).then(()=>{
                res.json({ process: true })
            })
            // console.log(data[0].messages);
        })
    }
}