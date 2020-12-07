const { use } = require("./routes/cart.route");

const users = [];

const addUser = ({ id, userId, name, room }) => {
    // console.log('asd: ' + id, name, room);
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    // const existingUser = users.find((user) => user.room === room && user.name == name);
    
    // if(existingUser) {
    //     return { error: 'Username is taken'}
    // }

    const user = { id, userId, name, room };
    users.push(user);
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)
    if(index !== -1 ) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUserinRoom = ( room ) => {
    users.filter(user => user.room === room)
}


module.exports = { addUser, removeUser, getUser, getUserinRoom }
