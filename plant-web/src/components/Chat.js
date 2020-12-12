import React, { useEffect, useState } from 'react';
// import queryString from 'query-string';
import io from 'socket.io-client';

// import TextContainer from '../test/TextContainer/TextContainer';
// import Messages from '../test/Messages/Messages';
import InfoBar from '../test/InfoBar/InfoBar';
// import Input from '../test/Input/Input';
import axios from 'axios';
import Cookies from 'js-cookie';
import ScrollToBottom from 'react-scroll-to-bottom';

import '../css/Chat.css';

let socket;

const Chat = (props) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const [user, setUser] = useState({});
    const ENDPOINT = 'http://localhost:9000/'

    useEffect(() => {
        const idUser = Cookies.get('id');
        
        const room = idUser;
        setRoom(idUser);
        socket = io(ENDPOINT);
        axios.get(ENDPOINT+'users/id='+idUser)
        .then(res => {
            setUser(res.data)
            setName(res.data.firstName)
             
            const name = res.data.firstName;

            socket.emit('join', { userId: idUser, name: name, room: room }, (error) => {
                if(error) {
                    alert(error);
                }
            })
        })   

    }, [ENDPOINT])


    useEffect(() => {
        socket.on('message', (messsage) => {
            // setMessages([...messages,] message]);
            const userId = Cookies.get('id');
            axios.get(ENDPOINT+"chat/showChat/"+userId)
            .then(res => {
                if(!res.data[0]) {
                    axios.post(ENDPOINT+"chat/createIdChat", {userId: userId})
                } else {
                    setMessages([...res.data[0].messages], messages)
                }
            }) 
        })
    },[messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            
            socket.on('message', message => {
                setMessages([...messages, message])
            })
         
          axios.post(ENDPOINT+'chat/sendMessage', {name: name, userId: Cookies.get('id'), message: message})
          .then(res => {
              if(res.data.process) {         
                    socket.emit('sendMessage', message, () => setMessage(''));
                }
            })
        }
      }
    return (
        <div className="outerContainer">
            <div className="container-chat">
                <InfoBar room={room} />
                {/* <div className="div-messages"> */}
                    <ScrollToBottom className="div-messages">
                        {
                            (messages) &&
                            messages.map(message => (               
                                    message.name.toLowerCase() != 'admin'
                                    ? <p className="message-client">{message.text}</p>
                                    : <p className="message-admin">{message.text}</p>    
                            ))
                        }
                    </ScrollToBottom>
                {/* </div> */}
                {/* <form className="form"> */}
                    <input
                    className="input-text"
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    />
                    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
                {/* </form> */}
            </div>
        </div>
    )
}

export default Chat;