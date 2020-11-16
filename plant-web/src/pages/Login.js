import React, { Component } from 'react'
import '../css/Login_Signup.css'
import facebooklogo from '../images/facebook.svg';
import googlelogo from '../images/google.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, TextField, InputAdornment} from '@material-ui/core';
import axios from 'axios';
import md5 from 'md5'
import Cookies from 'js-cookie';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
import Swal from 'sweetalert2'
import { LOCALHOST } from '../host.js'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            email: '',
            password: '',
            id: '',
            name: '',
            email_exist : false,
            password_err : false,
            password_length_err: false,

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentClicked = () => {
        console.log('Facebook btn clicked');
    }

    responseGoogle = (res) => {
        console.log(res.nt.pV);
        this.setState({
            auth: true
        })
        if(this.state.auth) {
            axios.post('/users/google_exist', {googleId: res.googleId })
            .then(response => {
                if(!response.data.exist) { 
                    const infor = {
                        firstName: res.nt.pV,
                        idGoogle: res.googleId,
                    }
                    console.log(infor)
                    axios.post('/users/register/google', infor)
                    .then(resGG => {
                        if(resGG.data.success) {
                            axios.post('/users/login/google', {id: res.googleId})
                            .then(resUser => {

                                let timerInterval
                                Swal.fire({
                                title: 'Logged in successfully!',
                                html: 'You will move to home page in <b></b> milliseconds.',
                                timer: 1000,
                                timerProgressBar: true,
                                willOpen: () => {
                                    Swal.showLoading()
                                    timerInterval = setInterval(() => {
                                    const content = Swal.getContent()
                                    if (content) {
                                        const b = content.querySelector('b')
                                        if (b) {
                                        b.textContent = Swal.getTimerLeft()
                                        }
                                    }
                                    }, 100)
                                },
                                onClose: () => {
                                    clearInterval(timerInterval)
                                }
                                }).then((result) => {
                                /* Read more about handling dismissals below */
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    const userId = resUser.data[0]._id;
                                    Cookies.set('id', userId, { expires: 1 });
                                    window.location.href = "/";
                                }
                                })
                            })
                        }
                    })
                } 
                
                
                
                else {
                    axios.post('/users/login/google', {id: res.googleId})
                    .then(resGG => {
                        let timerInterval
                        Swal.fire({
                        title: 'Logged in successfully!',
                        html: 'You will move to home page in <b></b> milliseconds.',
                        timer: 1000,
                        timerProgressBar: true,
                        willOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                            const content = Swal.getContent()
                            if (content) {
                                const b = content.querySelector('b')
                                if (b) {
                                b.textContent = Swal.getTimerLeft()
                                }
                            }
                            }, 100)
                        },
                        onClose: () => {
                            clearInterval(timerInterval)
                        }
                        }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            const userId = resGG.data[0]._id;
                            console.log(resGG.data);
                            // Cookies.set('id', userId, { expires: 1 });
                            // window.location.href = "/";
                        }
                        })
                    })
                }
            })
        }
    }

    responseFacebook = (res) => {
        console.log(res.status );
        if(res.status != 'unknown') {
            this.setState({
                auth: true
            })
        }
            if(this.state.auth) {
                axios.post('/users/facebook_exist', {facebookId: res.id })
                .then(response => {
                    if(!response.data.exist) { 
                        const infor = {
                            firstName: res.name,
                            idFacebook: res.id,
                        }
                        axios.post('/users/register/facebook', infor)
                        .then(resFb => {
                            if(resFb.data.success) {
                                axios.post('/users/login/facebook', {id: res.id})
                                .then(resFb => {

                                    let timerInterval
                                    Swal.fire({
                                    title: 'Logged in successfully!',
                                    html: 'You will move to home page in <b></b> milliseconds.',
                                    timer: 1000,
                                    timerProgressBar: true,
                                    willOpen: () => {
                                        Swal.showLoading()
                                        timerInterval = setInterval(() => {
                                        const content = Swal.getContent()
                                        if (content) {
                                            const b = content.querySelector('b')
                                            if (b) {
                                            b.textContent = Swal.getTimerLeft()
                                            }
                                        }
                                        }, 100)
                                    },
                                    onClose: () => {
                                        clearInterval(timerInterval)
                                    }
                                    }).then((result) => {
                                    /* Read more about handling dismissals below */
                                    if (result.dismiss === Swal.DismissReason.timer) {
                                        const userId = resFb.data[0]._id;
                                        Cookies.set('id', userId, { expires: 1 });
                                        window.location.href = "/";
                                    }
                                    })
                                })
                            }
                        })
                    } 
                    
                    
                    
                    else {
                        axios.post('/users/login/facebook', {id: res.id})
                        .then(resFb => {
                            let timerInterval
                            Swal.fire({
                            title: 'Logged in successfully!',
                            html: 'You will move to home page in <b></b> milliseconds.',
                            timer: 1000,
                            timerProgressBar: true,
                            willOpen: () => {
                                Swal.showLoading()
                                timerInterval = setInterval(() => {
                                const content = Swal.getContent()
                                if (content) {
                                    const b = content.querySelector('b')
                                    if (b) {
                                    b.textContent = Swal.getTimerLeft()
                                    }
                                }
                                }, 100)
                            },
                            onClose: () => {
                                clearInterval(timerInterval)
                            }
                            }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {
                                const userId = resFb.data[0]._id;
                                Cookies.set('id', userId, { expires: 1 });
                                window.location.href = "/";
                            }
                            })

                        })
                    }

                })
            }
    }


    componentDidMount() {
        this.checkLogin();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.state.email == 'adminplantweb@gmail.com' && this.state.password == '123456789') {
         
            Cookies.set('admin-plantweb', 'adminplantweb@gmail.com', { expires: 1 });
            window.location.href = "/";
        }
        const user = {
            email: this.state.email,
            password: md5('plantshop'+md5(this.state.password))
        }

        axios.post(LOCALHOST+'/users/login',user)
        .then(res=>{
            
            if(res.data.error_email) {
                this.setState({email_exist: true})
            } else {
                this.setState({email_exist: false})
            }
            if(this.state.password.length < 6) {
                this.setState({password_length_err: true})
            } else {
                this.setState({password_length_err: false})
                if(res.data.error_password) {
                    this.setState({password_err: true})
                } else {
                    this.setState({password_err: false})
                }   
            }
            if(res.data.valid) {
                
                // sweet-alert-2

                let timerInterval
                Swal.fire({
                title: 'Logged in successfully!',
                html: 'You will move to home page in <b></b> milliseconds.',
                timer: 1500,
                timerProgressBar: true,
                willOpen: () => {
                    Swal.showLoading()
                    timerInterval = setInterval(() => {
                    const content = Swal.getContent()
                    if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                        b.textContent = Swal.getTimerLeft()
                        }
                    }
                    }, 100)
                },
                onClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    // set Cookie and load to home page
                    Cookies.set('id', res.data._id, { expires: 1 });
                    window.location.href = "/";
                }
                })  
            }
        });
    }

    checkLogin() {
        if(Cookies.get('id')) {
            window.location.reload()
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
                            <h1>Login to continue</h1>
                            <div className="type_propertise">
                                <div className="type_propertise">
                                             
                                        <div className="text-field">
                                            {
                                                (this.state.email_exist == false) ?
                                                <TextField id="standard-basic" label="Email" type="email"
                                                    name="email"
                                                    defaultValue={this.state.email}
                                                    onChange={this.onChange}
                                                /> :
                                                <TextField
                                                    error
                                                    id="outlined-error"
                                                    type="email"
                                                    label="Email"
                                                    defaultValue={this.state.email}
                                                    name="email"
                                                    helperText="Your email is not valid."
                                                    onChange={this.onChange}
                                                /> 
                                            }
                                            
                                        </div>
                                        <div className="text-field">
                                            {
                                                (this.state.password_length_err == true) ?
                                                <TextField
                                                    error
                                                    id="outlined-error"
                                                    type="password"
                                                    label="Password"
                                                    defaultValue={this.state.password}
                                                    name="password"
                                                    helperText="Your password is not valid"
                                                    onChange={this.onChange}
                                                />
                                                :
                                                (this.state.password_err == false) ?
                                                <TextField id="standard-basic" label="Password" type="password" 
                                                    name="password"
                                                    defaultValue={this.state.password}
                                                    onChange={this.onChange}
                                                /> 
                                                 :
                                                <TextField
                                                    error
                                                    id="outlined-error"
                                                    type="password"
                                                    label="Password"
                                                    defaultValue={this.state.password}
                                                    name="password"
                                                    helperText="Your password is incorrect"
                                                    onChange={this.onChange}
                                                />
                                            }
                                            
                                        </div>
                                </div>
                            </div>

                            <div className="submit_field">
                                <button type="submit" className="btn_signup">LOGIN</button>
                            </div>

                            <div className="associable_network">
                            
                            {/* Login FB */}
                            
                            <FacebookLogin
                                appId="335059904474434"
                                autoLoad={false}
                                callback={this.responseFacebook}
                                onClick={this.componentClicked}
                                render={renderProps => (
                                    <div className="facebook_login" onClick={renderProps.onClick}>
                                        <div className="logo_associable_network">
                                            <img src={facebooklogo} />
                                        </div>
                                        <div className="word_associable_network">
                                            <p>Login</p>
                                        </div>
                                    </div>
                                )}
                            />

                            {/* Login Google */}

                            <GoogleLogin
                                clientId="2122750108-2a8ve0cg3p34kq93doatn9nv6nejv07p.apps.googleusercontent.com"
                                render={renderProps => (
                                    <div className="google_login" onClick={renderProps.onClick}>
                                        <div className="logo_associable_network">
                                            <img src={googlelogo} />
                                        </div>
                                        <div className="word_associable_network">
                                            <p>Login</p>
                                        </div>
                                    </div>
                                )}
                                buttonText="Login"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />,
                                
                            </div>

                            <h3>
                                Don’t have an account?
                            </h3>
                            <Link to="/user/signup">
                                Create an account
                            </Link>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login