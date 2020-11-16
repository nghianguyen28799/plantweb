import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import Axios from 'axios';

import '../css/Manage.css';
import Profile_icon from '../images/profile.svg';
import Order_icon from '../images/order.svg';
import Address_icon from '../images/address.svg';
import Wishlist_icon from '../images/wishlist_gray.svg'
import Address from "../components/Address.js"
import Profile from "../components/Profile.js"
import Add_Address from "../components/Add_Address.js"
import Wishlist from "../components/Wishlist.js"
import Orders from "../components/Orders.js"
import Update_Address from "../components/Update_Address.js";
import equal from 'fast-deep-equal';
import { LOCALHOST } from '../host.js'
class Manage extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            orders: [],
        }
    }

    componentDidMount() {
        this.getUser();
    }

    componentDidUpdate(PrevProps) {
        if(!equal(this.props.match.params.function, PrevProps.match.params.function)) {
            this.getUser();
        }
    }

    getUser() {
        const id = Cookies.get('id');
        const api = LOCALHOST+'/users/id='+id;
        Axios.get(api)
        .then(res => {
            this.setState({
                firstName: res.data.firstName
            })
        })
    }



    render() {
        return (
            <div className="manageDesign">
                <div className="container">
                    <div className="container-manage">
                        <div className="manage-left">
                            <div className="manage-hello">
                                <h3>Hello {this.state.firstName}</h3>
                            </div>
                            <div className="manage-function">
                                
                                <Link to="/user/manage=orders">
                                    <img src={Order_icon} />
                                    {
                                        (this.props.match.params.function == 'orders') ? 
                                        <span style={{ "border-bottom": "1px solid" }}>Orders</span> :
                                        <span>Orders</span>
                                    }
                                </Link>

                                <Link to="/user/manage=address" >
                                    <img src={Address_icon} />
                                    {
                                        (this.props.match.params.function == 'address' || this.props.match.params.function == 'add-address') ? 
                                        <span style={{ "border-bottom": "1px solid" }}>Addresses</span> :
                                        <span>Addresses</span>
                                    }
                                </Link>

                                <Link to="/user/manage=profile">
                                    <img src={Profile_icon} />
                                    {
                                        (this.props.match.params.function == 'profile') ? 
                                        <span style={{ "border-bottom": "1px solid" }}>Profile</span> :
                                        <span>Profile</span>
                                    }
                                </Link>

                                <Link to="/user/manage=wishlist" orders={this.state.order}>
                                    <img src={Wishlist_icon} />
                                    {
                                        (this.props.match.params.function == 'wishlist') ? 
                                        <span style={{ "border-bottom": "1px solid" }}>Wishlist</span> :
                                        <span>Wishlist</span>
                                    }
                                </Link>
                                
                            </div>
                        </div>  
                            {
                                <Switch>
                                    <Route path="/user/manage=address" exact component={ Address } />
                                    <Route path="/user/manage=profile" exact component={ Profile } />
                                    <Route path="/user/manage=wishlist" exact component={ Wishlist } />
                                    <Route path="/user/manage=add-address" exact component={ Add_Address } />
                                    <Route path="/user/manage=orders" exact component={ Orders } />
                                    <Route path="/user/manage=updateaddress:index" exact component={ Add_Address } />
                                </Switch>                                  
                            }
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Manage