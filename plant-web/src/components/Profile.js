import React, { Component } from 'react'
import '../css/Profile.css';
import Cookies from 'js-cookie';
import { Button, TextField, InputAdornment} from '@material-ui/core';
import Axios from 'axios';
import md5 from 'md5';
class Profile extends Component {
    constructor(props) {
        super(props);
            this.state = {
                id: Cookies.get('id'),
                email: '',
                lastName: '',
                firstName: '',
                phone: '',
                password: '',
                newPassword: '',
                lastName_err: false,
                firstName_err: false,
                phone_err: false,
                password_err: false,
                newPassword_err: false,
            }
            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.getInformationUser()
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        this.setState({changed: true});
    }

    onSubmit(e) {
        e.preventDefault();
        const lastName = document.getElementById('lastname-text').children[0].children[0].children[1].children[0].value
        const firstName = document.getElementById('firstname-text').children[0].children[0].children[1].children[0].value
        const phone = document.getElementById('phone-text').children[0].children[0].children[1].children[0].value
        const password = document.getElementById('password-text').children[0].children[0].children[1].children[0].value
        const newPassword = document.getElementById('newpassword-text').children[0].children[0].children[1].children[0].value
        
        let inforValid = true;
        let passwordValid = true;
        let allValid = true;
        
        if(lastName == '') {
            this.setState({lastName_err: true})
            inforValid = false;
        } else {
            this.setState({lastName_err: false})
        }

        if(firstName == '') {
            this.setState({firstName_err: true})
            inforValid = false;
        } else {
            this.setState({firstName_err: false})
        }

        if(phone.length != 10) {
            this.setState({phone_err: true})
            inforValid = false;
        } else {
            this.setState({phone_err: false})
        }
        

        // Thong tin hop le, khong nhap nhap password va new password

        if(inforValid && !password && !newPassword) {
            this.setState({
                password_err: false,
                newPassword_err: false
            }) 
       
            const infor = {
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone
            }
            if(this.state.changed) {
                Axios.post('/users/update/userinfor', infor)
                .then(() => {
                    window.location.reload(false);
                })
            }
        } 
        // Thong tin hop le, nhap ca password va new password
        
        else if(inforValid && password && newPassword) {
            
            if(md5('plantshop'+md5(password)) != this.state.passwordUser) {
                this.setState({password_err: true})
                passwordValid = false;
            } else {
                this.setState({password_err: false})
            }

            if(newPassword == password || newPassword.length < 6) {
                this.setState({newPassword_err: true})
                passwordValid = false;
            } else {
                this.setState({newPassword_err: false})
            }
            const inforUser = {
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone,
                newPassword: this.state.newPassword
            }
            if(passwordValid) {
                Axios.post('/users/update/password', inforUser)
                .then(() => {
                    window.location.reload(false);
                })
            }
        }

        // Thong tin hop le, chi nhap password hoac new password

        else if(inforValid && (password || newPassword)) {
            if(password.length < 6 || md5('plantshop'+md5(password)) != this.state.passwordUser) {
                this.setState({password_err: true})
            } else {
                this.setState({password_err: false})
            }
            if(newPassword != password || newPassword.length < 6) {
                this.setState({newPassword_err: true})
            } else {
                this.setState({newPassword_err: false})
            }
        } 


    }


    getInformationUser() {
        const idUser = this.state.id;
        const api = '/users/id='+idUser;
        Axios.get(api)
        .then(res => {
            this.setState({ 
                email: res.data.email,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                phone: res.data.phone,
                facebookId: res.data.facebookId,
                passwordUser: res.data.password
            })
        })
    }
    render() {
        const { firstName_err, lastName_err, phone_err, password_err, newPassword_err} = this.state
        return (
            <div className="manage-right">
                <div class="profile-container">
                    <div className="profile-title">
                        <h3>Profile</h3>
                        <h5>General Information</h5>
                    </div>

                    <form onSubmit={this.onSubmit}> 
                    <div className="profile-content">
                       <div className="each-content" id="email-text">
                            <div className="text-field">
                                <TextField id="standard-basic" label="Email" type="email" disabled
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                       </div>

                       <div className="each-content" id="firstname-text">
                            <div className="text-field">
                                {
                                    (firstName_err) ?
                                        <TextField
                                            error
                                            id="outlined-error"
                                            label="First Name"
                                            value={this.state.firstName}
                                            name="firstName"
                                            onChange={this.onChange}
                                        /> :
                                        <TextField id="standard-basic" label="First Name" 
                                            name="firstName"
                                            value={this.state.firstName}
                                            onChange={this.onChange}
                                        />
                                }
                                
                            </div>
                       </div>

                       <div className="each-content" id="lastname-text">
                            <div className="text-field">
                                {
                                    (lastName_err) ?
                                        <TextField
                                            error
                                            id="outlined-error"
                                            label="First Name"
                                            value={this.state.lastName}
                                            name="lastName"
                                            onChange={this.onChange}
                                        /> :
                                        <TextField id="standard-basic" label="Last Name" 
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={this.onChange}
                                        />
                                }
                            </div>
                       </div>

                       <div className="each-content" id="phone-text">
                            <div className="text-field">
                                {
                                    (phone_err) ?
                                        <TextField
                                            error
                                            id="outlined-error"
                                            label="Phone"
                                            value={this.state.phone}
                                            name="phone"
                                            onChange={this.onChange}
                                        /> :
                                        <TextField id="standard-basic" label="Phone" 
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.onChange}
                                        />
                                }
                            </div>
                       </div>


                       <div className="each-content" id="password-text">
                            
                            <div className="text-field">
           
                            { 
                                (this.state.facebookId) ?
                                <TextField id="standard-basic" label="Password" type="password" disabled
                                        value={this.state.password} 
                                /> :
                                (password_err) ?
                                    <TextField
                                        error
                                        type="password"
                                        id="outlined-error"
                                        label="Password"
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.onChange}
                                    /> :
                                    <TextField id="standard-basic" label="Password" type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                }
                            </div>
                       </div>

                       <div className="each-content" id="newpassword-text">
                            <div className="text-field">
                                {
                                    (this.state.facebookId) ?
                                    <TextField id="standard-basic" label="New Password" type="password" disabled
                                            value={this.state.newPassword}
                                    /> :
                                    (newPassword_err) ?
                                        <TextField
                                            error
                                            type="password"
                                            id="outlined-error"
                                            label="New Password"
                                            value={this.state.newPassword}
                                            name="newPassword"
                                            onChange={this.onChange}
                                        /> :
                                        <TextField id="standard-basic" label="New Password" type="password"
                                            name="newPassword"
                                            value={this.state.newPassword}
                                            onChange={this.onChange}
                                        />
                                }
                            </div>
                       </div>
                    </div>

                    <div className="profile-button">
                        <button type="submit" className="button-update-profile">Update</button>
                    </div>
                    </form>
                </div>
                
            </div>
            
        )
    }
}

export default Profile