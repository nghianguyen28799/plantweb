import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import axios from 'axios';
import Cookies from 'js-cookie';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../css/chatAdmin.css';

let socket;

const Chat = (props) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const ENDPOINT = 'http://localhost:9000/'

    useEffect(() => {
        // const idUser = Cookies.get('id');
        axios.get('http://localhost:9000/chat')
        .then(res => {
            setData(res.data);
            axios.get('http://localhost:9000/users/id='+res.data[0].userId)
            .then(resUser => {
                setUser(resUser.data)
            })
        })

        const room = props.match.params.id;
        const name = "Admin";
        setName(name)
        setRoom(room);
        socket = io(ENDPOINT);
        socket.emit('join', { userId: '', name: name, room: room }, (error) => {
            if(error) {
                alert(error);
            }
        })    
    }, [ENDPOINT])


    // useEffect(() => {
    //     const userId = props.match.params.id;
    //     axios.get(ENDPOINT+"chat/showChat/"+userId)
    //     .then(res => {s
    //         if(!res.data[0]) {
    //             axios.post(ENDPOINT+"chat/createIdChat", {userId: userId})
    //         } else {
    //             setMessages([...res.data[0].messages], messages)
    //         }
    //     }) 
    // }, [props.match.params.id]);

    useEffect(() => {
        socket.on('message', (messsage) => {
            // setMessages([...messages,] message]);
            const userId = props.match.params.id;
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
        const userId = props.match.params.id;
        if(message) {
            
            socket.on('message', message => {
                setMessages([...messages, message])
            })
         
          axios.post(ENDPOINT+'chat/sendMessage', {name: name, userId: userId, message: message})
          .then(res => {
              if(res.data.process) {         
                    socket.emit('sendMessage', message, () => setMessage(''));
                }
            })
            // socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="page-admin-chat">
            <div className="container-admin-chat">
                <div className="left-admin-chat">
                    {
                        data.map(dt => (
                            (dt.userId !== props.match.params.id)
                            ?
                            <div className="id-contact-chat"  onClick={() => props.history.push('/contact/userid='+dt.userId)}>
                                <h5># {dt.userId}</h5>
                            </div>
                            :
                            <div className="id-other-contact-chat">
                                <h5># {dt.userId}</h5>
                            </div>
                        ))
                    }
                </div>
                <div className="right-admin-chat">
                    <div className="title-admin-chat">
                        <h5>{user.firstName}</h5>
                    </div>
                    {/* <div className="chat-admin-content"> */}
                    <ScrollToBottom className="chat-admin-content">
                        {
                            (messages) &&
                            messages.map(message => (               
                                    message.name.toLowerCase() == 'admin'
                                    ? <p className="admin-message-admin">{message.text}</p>
                                    : <p className="admin-message-client">{message.text}</p>    
                            ))
                        }
                    </ScrollToBottom>
                    {/* </div> */}
                    <div className="button-chat-admin">
                       <input
                            className="input-text-admin"
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={({ target: { value } }) => setMessage(value)}
                            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                        />
                        <button className="sendButton-admin" onClick={e => sendMessage(e)}>Send</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Chat;