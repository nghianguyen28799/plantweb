import React, { Component } from 'react'
import '../css/Address.css';
import Plus from '../images/plus.png';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import Axios from 'axios';
import { LOCALHOST } from '../host.js'
import Delete_icon from '../images/delete.svg';
import Pencil_icon from '../images/pencil.png';
class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        const id = Cookies.get('id');
        const api = LOCALHOST+'/users/id='+id;
        Axios.get(api)
        .then(res => {
            this.setState({
                addresses: res.data.address
            })
        })
    }

    getDelete(address) {
        console.log(address);
        const id = Cookies.get('id');
        const api = LOCALHOST+'/users/deleteaddress';
        Axios.post(api, {id: id, address: address})
        .then(res => {
            window.location.reload()
        })
    }

    // changePage(index) {
    //     this.props.history.push('/user/manage=updateaddress'+index);
    // }

    render() {
        return (
            <div className="manage-right-address">
                {
                    this.state.addresses.map((address, index) => (
                        <div className="div-add-address">
                            <div className="delete-address" onClick={() => this.getDelete(address)}>
                                <img src={Delete_icon}/>
                            </div>

                            <div className="show-address">
                                <p>{address} </p>
                            </div>
                        </div>
                    ))
                }
                <div className="div-add-address">
                    <div className="link-add-address">
                        <Link to="/user/manage=add-address">
                            <div className="link-add-address-img">
                                <img src={Plus}/>
                            </div>
                            <div className="link-add-address-word">
                                <h5>Add new address</h5>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}

export default Address