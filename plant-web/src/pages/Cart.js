import React, { Component } from 'react';
import '../css/Cart.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import equal from 'fast-deep-equal';
import Swal from 'sweetalert2'
import Modals from '../components/Modals.js'
import { LOCALHOST } from '../host.js'
import Remove from '../images/remove.svg';
import Delete from '../images/delete.svg';
import emptyCart from '../images/empty-cart.svg';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            shippingFee: 3,
            shippingTime: '3-5 days',
            modals: false,
            user: '',
            infoCart: '',
            getQty: [],
            applyVoucher: false,
            errorVoucherText: '',
            num_price: 0,
        }
        this.getUpdate = this.getUpdate.bind(this);
        this.delete = this.delete.bind(this);
        this.toggle = this.toggle.bind(this);
        this.checkOut = this.checkOut.bind(this);
        this.applyVoucher = this.applyVoucher.bind(this);
    }
    
    componentDidMount() {
        if(!Cookies.get('id')) {
            this.props.history.push('/user/login');
        }
        this.getCart()
        this.getUser()
    }

    getUser() {
        const id = Cookies.get('id');
        const api = LOCALHOST+'/users/id='+id;
        axios.get(api)
        .then(res => {
            this.setState({
                user: res.data
            })
        })
    }

    getCart() {
        const id = Cookies.get('id');
        let api = LOCALHOST+'/cart/showCart/id='+id;
        axios.get(api).then(res => {
            this.setState({
                products: res.data,
            })
            var num_price = 0;
            res.data.map(product => (
                num_price += (product.price * product.number)
            ))
            this.setState({
                num_price: num_price
            })


            let products = res.data;
            let num = 0;
            for(let i in products) {
                num += products[i].number;
            }
            document.getElementById('number_cart').innerHTML = num;
            document.getElementById('number_cart_mobile').innerHTML = num;
            res.data.map(product => {
                axios.get(LOCALHOST+"/product/id=" + product.productId)
                .then(res1Product => {
                    this.setState({
                        getQty: this.state.getQty.concat(res1Product.data[0].number)
                    })
                })
            })
        })
    }


    getUpdate(idProduct, idUser, num) {
  
        let remainNum = 0;
        let qty = Number(document.getElementById('qty_text_'+idProduct).value);
        const api = LOCALHOST+'/cart/product/update';
        
        axios.get(LOCALHOST+"/product/id="+idProduct)
        .then(response => {
            if(qty+num < 1 ) {
                this.delete(idProduct, idUser);
            }

            else if(qty + num > response.data[0].number) {
                const getData = {
                    idProduct: idProduct,
                    idUser: idUser,
                    number: 0
                }
            } else {
                const getData = {
                    idProduct: idProduct,
                    idUser: idUser,
                    number: num
                }
                axios.post(api, getData)
                .then((res) => {
                    this.getCart();
                })
            }
        })
    }

    delete(idProduct, idUser) {
        const getData = {
            idProduct: idProduct,
            idUser: idUser
        }
        const api = LOCALHOST+'/cart/product/delete';
       
        Swal.fire({
        title: 'Are you sure?',
        text: "This product will be deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Deleted!',
            'A your product in cart has been deleted.',
            'success'
            )
            axios.post(api, getData)
            .then(() => {
                this.getCart();
            })
        }
        })      
    }

    changeTick(id1, id2, fee, shippingTime) {
        document.getElementById(id1).style.background = "#95d600";
        document.getElementById(id2).style.background = "none";
        this.setState({
            shippingFee: fee,
            shippingTime: shippingTime
        })
    }

    backToProduct(id) {
        this.props.history.push('/product/id=' + id);
    }

    checkOut() {
        this.setState({
            modals: !this.state.modals
        })
        
        let shipping_Fee = this.state.shippingFee;
        const productArr = this.state.products;
        let productId = [];
        let number = [];
        let name = [];
        let price = [];
        let image = [];
        let size = [];
        for(var i in productArr) {
            productId.push(productArr[i].productId);
            number.push(productArr[i].number);
            name.push(productArr[i].nameProduct);
            price.push(productArr[i].price);
            image.push(productArr[i].image);
            size.push(productArr[i].size);  
        }
        if(shipping_Fee === 'Free') {
            shipping_Fee = 0;
        }
        let num_price = 0;
        this.state.products.map(product => (
            num_price += (product.price * product.number)
        ))
        const orderInformation = {
            userId: Cookies.get('id'),
            productId: productId,
            total: num_price,
            numberOfEachProduct: number,
            shippingFee: Number(shipping_Fee),
            image: image,
            name: name,
            price: price,
            shippingTime: this.state.shippingTime,
            size: size,
        }
        this.setState({
            infoCart: orderInformation
        })
    }

    toggle() {
        this.setState({
            modals: !this.state.modals
        })
    }

    applyVoucher() {
        const { voucherText } = this.state;
        if(voucherText) {
            axios.post(LOCALHOST+'/voucher/checkvoucher', {id: Cookies.get('id'), name: voucherText})
            .then(res => {
                if(res.data.error) {
                    console.log('1');
                    this.setState({ errorVoucherText: 'This voucher is used' })
                    const orderSummary = document.getElementById('order_summary');
                    orderSummary.style.marginTop = "0";
                    let back = setInterval(timer, 2000);
                    let count = 0;
                    function timer() {
                        orderSummary.style.marginTop = "-50px";
                        clearInterval(back);
                    }
                }
                else if(res.data[0]) {
                    // 
                    if(this.state.num_price < res.data[0].minOrder) {
                        this.setState({ errorVoucherText: 'Minimun Order from ' + res.data[0].minOrder })
                        const orderSummary = document.getElementById('order_summary');
                        orderSummary.style.marginTop = "0";
                        let back = setInterval(timer, 2000);
                        let count = 0;
                        function timer() {
                            orderSummary.style.marginTop = "-50px";
                            clearInterval(back);
                        }

                    } else {
                        this.setState({ 
                            Voucher: res.data[0],
                            applyVoucher: true
                        }); 
                    }
                                   
                }
                else {
                    console.log('3');
                    this.setState({ errorVoucherText: 'Invalid Voucher' })
                    const orderSummary = document.getElementById('order_summary');
                    orderSummary.style.marginTop = "0";
                    let back = setInterval(timer, 2000);
                    let count = 0;
                    function timer() {
                        orderSummary.style.marginTop = "-50px";
                        clearInterval(back);
                    }
                }
            })
        }    
    }
    
    render() {
        const { num_price, products, Voucher, applyVoucher } = this.state;

        var totalToFree = num_price; 
        var text = "";
        var shippingFee = this.state.shippingFee;
        var text_ship = shippingFee;
        if(num_price>=100) {
            totalToFree=100;
            text = "Congrats! You've earned FREE shipping"
            shippingFee = 0;
            text_ship = "Free"
        } else {    
            text = "You are USD " +(100-num_price)+" away from free shipping"
        }

        var percent = 0;
        var reducedPrice = 0;
        if(applyVoucher) {
            percent = Voucher.percent;
            
            if((num_price * percent / 100) > Voucher.maximum) {
                reducedPrice = Voucher.maximum;
            } else {
                reducedPrice = num_price * percent / 100;
            }
        }

        // console.log(applyVoucher);
        if(products.length == 0) {
            return (
                <div className="cart_page_wrap">
                    <div className="container">
                        <div className="image">
                            <img src={emptyCart} />
                        </div>
                        <div className="text">
                            <h3>Your room looks empty</h3>
                            <p>Let's add some plants and make it brighter</p>
                            <Link to="/">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="cart_page_wrap">
                    <div className="container">
                        <div className="cart_left">
                            <div className="cart_left_header">
                                <h1>My Cart</h1>
                            </div>
                            <Modals changeToggle={this.toggle} toggle={this.state.modals} user={this.state.user} infoCart={ this.state.infoCart } Voucher={ Voucher } />
                            <div className="cart_table">
                                {
                                    products.map((product, index) => (
                                        <div className="each_product">
                                            <div className="image_wrap" onClick={() => this.backToProduct(product.productId)}>
                                                <img src={require('../images/products/'+product.image)} />
                                            </div>
                                            <div className="product_text">
                                                <h3>{product.nameProduct}</h3>
                                                <p>{product.size}</p>
                                                <h2>USD {product.price}</h2>
                                            </div>
                                            <div className="product_option">
                                                <div className="qty_product">
                                                    <button className="button_reduce_cart" onClick={() => {
                                                        this.getUpdate(product.productId, product.userId, -1)
                                                    }}></button>
                                                    <input type="text" className="qty_text" id={"qty_text_" + product.productId} disabled="disabled" value={product.number}/>
                                                    <button className="button_raise_cart" onClick={() => this.getUpdate(product.productId, product.userId, 1)}></button>
                                                </div>
                                                <div className="remain-number">
                                                    {this.state.getQty[index]} available products
                                                </div>
                                                <div className="remove_product" onClick={() => this.delete(product.productId, product.userId)}>
                                                    <p>Remove</p>
                                                    <img src={Remove}/>
                                                </div>                                            
                                            </div>
                                        </div>
                                    ))    
                                }
                            </div>
                        </div>
                        <div className="cart_right">
                            <div className="cart_box">
                                <h5>{text}</h5>
                                <div className="free_shipping_cart"> 
                                    <p className="start_freeship">USD {num_price}</p>
                                    <p className="end_freeship">USD 100</p>
                                    <div className="freeship_bar">
                                        <div className="bar" style={{width: totalToFree+'%'}}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="cart_box">
                                <h4>Choose delivery mode</h4>
                                <ul>
                                    <li onClick={()=>this.changeTick('tick_green_nor','tick_green_ex', 3, '2 days')}>
                                        <div className="tick" id="normal">
                                            <div className="tick_green" id="tick_green_nor" style={{background: '#95d600'}}>

                                            </div>
                                        </div>
                                        Normal delivery in 3 - 5 working days
                                    </li>
                                    <li onClick={()=>this.changeTick('tick_green_ex','tick_green_nor', 5, '3-5 days')}>
                                        <div className="tick" id="express">
                                            <div className="tick_green" id="tick_green_ex">

                                            </div>
                                        </div>
                                        Express delivery in 2 Working Days
                                    </li>
                                </ul>
                            </div>

                            <div class="cart_box">
                                <div>
                                    {
                                        (!applyVoucher)
                                        ?
                                        <div className="coupon_box">
                                            <div className="button_coupon" onClick={this.applyVoucher}>
                                                Apply
                                            </div>
                                            <input type="text" name="voucherText" onChange={(e) => {this.setState({ voucherText: e.target.value})}} className="text_coupon" placeholder="Enter coupon or gift card"/>
                                        </div>
                                        :
                                        <div className="valid_coupon_box">
                                           <p> your entered voucher successfully </p>
                                           <img src={Delete} onClick={() => {this.setState({ voucher: [], applyVoucher: false, voucherText: '' })}}/>
                                        </div>
                                    }
                                    

                                    <div className="invalid_coupon_box">
                                        <p>{ this.state.errorVoucherText }</p>
                                    </div>

                                    <div className="order_summary" id="order_summary">
                                        <h4>Order Summary</h4>
                                        <div className="total_row">
                                            <p>Sub total</p>
                                            <span>USD {num_price}</span>
                                            <p>Shipping</p>
                                            <span id="shippingFee">{text_ship}</span>
                                            {
                                            (num_price < 100)?
                                            <span>USD&nbsp;</span> : 
                                            <span></span>
                                            }
                                            <p>Coupon/gift</p>
                                            {
                                                (applyVoucher)
                                                ? <span>USD {reducedPrice} (-{percent}%)</span>
                                                : <span></span> 
                                            }
                                        </div>

                                        
                                    </div>
                                    <div className="total_bill">
                                        <h2>TOTAL</h2>
                                        <span id="checkOutTotal">{num_price - reducedPrice + shippingFee}</span>
                                        <span>USD &nbsp;</span>
                                        
                                    </div>
                                </div>
                            </div>
                            {/* <a > */}
                                <div className="checkout_box" onClick = {this.checkOut}>
                                    <p class="checkout_left">USD {num_price - reducedPrice + shippingFee}</p>
                                    <p class="checkout_right">checkout now</p>
                                </div>  
                            {/* </a> */}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Cart;