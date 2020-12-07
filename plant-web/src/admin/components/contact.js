import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Axios from 'axios';

import '../css/contact.css'
import '../css/addProduct.css'


class Contact extends Component {
    constructor(props) {
        super(props);
            this.state = {
                data: [],
                userName: [],
            }
    }

    componentDidMount() {
        Axios.get('http://localhost:9000/chat')
        .then(res => {
            this.setState({ data: res.data })
            for(let i in res.data) {
                Axios.get('http://localhost:9000/users/id='+res.data[i].userId)
                .then(resName => {
                    // console.log(resName.data);
                    this.setState({
                        userName: this.state.userName.concat(resName.data.firstName)
                    })
                })
            }
        })
    }

    switchPage(id) {
        this.props.history.push('/contact/userid='+id);
    }
   
    render(){
       const { data, userName } = this.state;
        return (
            <div className="contact-page">
                <div className="container-contact">
                    <div className="title-contact">
                        <h3>Contact</h3>
                    </div>
                    <div className="content-contact" >
                        {
                            data.map((dt, index) => (
                                <div className="each-contact" onClick={() => this.switchPage(dt.userId)}>
                                    <div className="id-contact">
                                        <h5># {dt.userId}</h5>
                                    </div>
                                    <div className="name-contact">
                                        <h5>{userName[index]}</h5>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
};

export default Contact;