import React, { Component } from 'react'
import '../css/Login_Signup.css'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {TextField} from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import { LOCALHOST } from '../host.js'
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            email_exist: false,
            firstName_err: false,
            lastName_err: false,
            phone_err: false,
            email_err: false,
            password_err: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.checkSignup();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        const email = document.getElementById('email_text').children[0].children[1].children[0].value;        
        const firstname = document.getElementById('firstname_text').children[0].children[1].children[0].value;
        const lastname = document.getElementById('lastname_text').children[0].children[1].children[0].value
        const phone = document.getElementById('phone_text').children[0].children[1].children[0].value
        const password = document.getElementById('password_text').children[0].children[1].children[0].value

        if(firstname == '') {
            this.setState({ firstName_err: true})
        } else {
            this.setState({ firstName_err: false})
        }

        if(lastname == '') {
            this.setState({ lastName_err: true})
        } else {
            this.setState({ lastName_err: false})
        }

        if(email == '') {
            this.setState({ email_err: true})
        } else {
            this.setState({ email_err: false})
        }

        if(phone.length != 10) {
            this.setState({ phone_err: true})
        } else {
            this.setState({ phone_err: false})
        }

        if(password.length < 6) {
            this.setState({ password_err: true})
        } else {
            this.setState({ password_err: false})
        }

        
        axios.post(LOCALHOST+'/users/email_exist',{email: email})
        .then(res=>{
            if(res.data.exist == true) {
                this.setState({email_exist: true})
            } else {
                this.setState({email_exist: false})
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const { firstName, lastName, phone, email, password } = this.state;
        const { firstName_err, lastName_err, phone_err, email_err, email_exist ,password_err } = this.state;
        this.onChange(e);
        const user = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            password: password,
        }
        console.log(user)
        if(firstName_err == true || lastName_err == true || phone_err == true || email_err == true || password_err == true || email_exist == true) {
            alert("Error! ");
        } else {
            axios.post(LOCALHOST+'/users/register',user)
            .then(res=>{
                if(res.data.valid == true) {
                    Swal.fire({
                        position: 'mid',
                        icon: 'success',
                        title: 'Signed up success',
                        showConfirmButton: false,
                        timer: 1500
                      }). then(() => {
                        this.props.history.push('/user/login'); 
                      })  
                }         
            });
        }
    }

    checkSignup() {
        if(Cookies.get('id')) {
            this.props.history.push('/');
        }
    }
    
    render() {
        return(
            <div className="form_signup_signin">
                <div className="container">
                    <div className="form_wrap">
                    <form onSubmit={this.onSubmit}> 
                        <div className="form_container">
                            <h1>Create your account</h1>
                            <div className="type_propertise">
                                <div className="text-field" id="firstname_text">
                                    {
                                        (this.state.firstName_err == false) ?
                                        <TextField id="standard-basic" label="First Name" 
                                            name="firstName"
                                            value={this.state.firstName}
                                            onChange={this.onChange}
                                            onClick={this.onChange_firstname}
                                        />:
                                        <TextField
                                            error
                                            id="outlined-error"
                                            label="First Name"
                                            defaultValue={this.state.firstName}
                                            name="firstName"
                                            helperText="Please enter your first name (only letters)."
                                            onChange={this.onChange}
                                        />
                                    }

                                </div>
                                <div className="text-field" id="lastname_text">
                                    {
                                        (this.state.lastName_err == false) ?
                                        <TextField id="standard-basic" label="Last Name" 
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={this.onChange}
                                
                                        />:
                                        <TextField
                                            error
                                            id="outlined-error"
                                            label="Last Name"
                                            defaultValue={this.state.lastName}
                                            name="lastName"
                                            helperText="Please enter your last name (only letters)."
                                            onChange={this.onChange}
                                        />
                                    }

                                </div>
                                <div className="text-field" id="phone_text">
                                    {
                                        (this.state.phone_err == false) ?
                                        <TextField id="standard-basic" label="Phone" 
                                            name="phone"
                                            defaultValue={this.state.phone}
                                            onChange={this.onChange}
                                        
                                        />:
                                        <TextField
                                            error
                                            id="outlined-error"
                                            label="Phone"
                                            defaultValue={this.state.phone}
                                            name="phone"
                                            helperText="Please enter your phone number (only 10 numbers)."
                                            onChange={this.onChange}
                                        />
                                    }
                                </div>
                                <div className="text-field" id="email_text">
                                    {
                                        (this.state.email_err == true) ?
                                        <TextField
                                            error
                                            id="outlined-error"
                                            type="email"
                                            label="Email"
                                            defaultValue={this.state.email}
                                            name="email"
                                            helperText="Please enter your email format correctly."
                                            onChange={this.onChange}
                                        />
                                        : ((this.state.email_exist == true) ?
                                        <TextField
                                            error
                                            id="outlined-error"
                                            type="email"
                                            label="Email"
                                            defaultValue={this.state.email}
                                            name="email"
                                            helperText="This email existed."
                                            onChange={this.onChange}
                                        /> 
                                        :
                                        <TextField id="standard-basic" label="Email" type="email" 
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                        />
                                        )
                                    }
                                </div>
                                <div className="text-field" id="password_text">
                                    {
                                        (this.state.password_err == false) ?
                                        <TextField id="standard-basic" label="Password" type="password" 
                                            name="password"
                                            defaultValue={this.state.password}
                                            onChange={this.onChange}
                                        
                                        />:
                                        <TextField
                                            error
                                            id="outlined-error"
                                            type="password"
                                            label="Password"
                                            defaultValue={this.state.password}
                                            name="password"
                                            helperText="Please enter your password (Minimum 6 characters required)."
                                            onChange={this.onChange}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="submit_field">
                                <button type="submit" className="btn_signup">signup now</button>
                            </div>
                            <h3>
                                Do you have an account?
                            </h3>
                            <Link to="/user/login">
                                Login here
                            </Link>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup