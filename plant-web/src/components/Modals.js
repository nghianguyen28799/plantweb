import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Cookies from 'js-cookie';
import axios from 'axios';
import { LOCALHOST } from '../host.js'
import { Link } from "react-router-dom";
class ModalExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
          address: '',
          validAddress: false,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
      this.setState({
          validAddress: true
      })
    }

    checkOut() {
      
      const { user, infoCart } = this.props
        const data = {
        userId: Cookies.get('id'),
        userName: user.firstName + user.lastName,
        userPhone: user.phone,
        userAddress: this.state.address,
        productId:  infoCart.productId,
        productName: infoCart.name,
        productPrice: infoCart.price,
        productImage: infoCart.image,
        productSize: infoCart.size,
        numberOfEachProduct: infoCart.numberOfEachProduct,
        shippingFee: infoCart.shippingFee, 
        productPriceTotal: infoCart.total,
        shippingTime: infoCart.shippingTime,
      }
      if(this.state.validAddress) {
        axios.post(LOCALHOST+'/order/createOrder', data)
        .then(() => {
            if(this.props.Voucher) {
                axios.post(LOCALHOST+'/voucher/updateUsedVoucher', { voucher: this.props.Voucher, userId: Cookies.get('id') })
            }
          window.location.href = "/user/manage=orders";
        })
      }  
    }

    render() {
        var firstSelect = '';
        var currencies = [];
        for(let i in this.props.user.address) {
          if(i == 0) {
            firstSelect = {value: this.props.user.address[i], label: this.props.user.address[i]}
          }
          const value = {value: this.props.user.address[i], label: this.props.user.address[i]}
          currencies.push(value)
        }
        return (
            <div>
                <Modal isOpen={this.props.toggle} toggle={this.propstoggle} style={{'z-index': 99999999}}>
                <ModalHeader toggle={this.props.changeToggle}>Your Information</ModalHeader>
                <ModalBody>
                    <form>
                        <TextField id="standard-basic" label="Name" 
                            value={this.props.user.firstName +' '+ this.props.user.lastName}
                        />
                        <TextField id="standard-basic" label="Phone" 
                            value={this.props.user.phone}
                        />

                        {
                            (!this.state.validAddress) ? 
                            <TextField
                                id="standard-select-currency"
                                color="red"
                                select
                                label="Address"
                                name="address"
                    
                                onChange={this.handleChange}
                                helperText="Please select your currency"
                            >
                                {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </TextField> :
                                <TextField
                                id="standard-select-currency"
                                color="red"
                                select
                                label="Address"
                                name="address"
                    
                                onChange={this.handleChange}
                            
                            >
                                {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                                ))}
                            </TextField>
                        }
                        
                    </form>
                </ModalBody>  
                <ModalFooter>
                    
                    <Link to="/user/manage=profile">
                        <Button color="secondary">Update Information</Button>
                    </Link>
                    <Link to="/user/manage=add-address">
                        <Button style={{background: "red"}}>Add Address</Button>
                    </Link>
                    <Button color="primary" onClick={()=> this.checkOut()}>Check Out</Button>
                    {/* <Button color="secondary" onClick={this.props.changeToggle}>Cancel</Button> */}
                        
                </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ModalExample