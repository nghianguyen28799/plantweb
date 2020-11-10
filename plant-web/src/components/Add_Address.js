import React, { Component } from 'react';
import '../css/Add_Address.css';
import { BrowserRouter as Link } from "react-router-dom";
import Cookies from 'js-cookie';
import Map from './Map.js';
import Select_Address from './Select_Address'
import {GoogleApiWrapper} from 'google-maps-react';
class Add_Address extends Component {
    constructor(props) {
        super(props);
    }


  
    render() { 
        return (
            <div className="manage-right-add-address">
                <div className="add-address-title">
                    <h3>Add New Address</h3>
                </div>
                <div className="add-address-content">
                    <div>
                        <Select_Address />
                    </div>
                </div>
            </div>
        )
    }
}

export default Add_Address
