import React, { Component } from 'react';
import '../css/Add_Address.css';
import { BrowserRouter as Link } from "react-router-dom";
import Cookies from 'js-cookie';
import Map from './Map.js';
import Show_Update_Address from './Show_Update_Address'
import {GoogleApiWrapper} from 'google-maps-react';
class Add_Address extends Component {
    constructor(props) {
        super(props);
    }


  
    render() { 
        console.log(this.props.match.params.index);
        return (
            <div className="manage-right-add-address">
                <div className="add-address-title">
                    <h3>Add New Address</h3>
                </div>
                <div className="add-address-content">
                    <div>
                        <Show_Update_Address index={this.props.match.params.index}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Add_Address
