import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import equal from 'fast-deep-equal';
import { LOCALHOST } from '../host.js'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Header.css';
import '../css/Menu.css';
import 'animate.css';
import Logo from '../images/logo-plantshop.png'
import SearchLogo from '../images/search.svg';
import SearchLogoMobile from '../images/search_mobile.svg';
import Profile from '../images/profile.svg'
import Order from '../images/order.svg'
import Address from '../images/address.svg'

import Delivery from '../images/delivery.svg'
import Return from '../images/return.svg'
import Hotline from '../images/hotline.svg'
import Account from '../images/account.svg'
import Cart from '../images/cart.svg'
import Wishlist from '../images/wishlist_gray.svg'
import LogOut from '../images/logout.svg';
import Delete from '../images/delete.svg';
import BackToLeft from '../images/backToLeft.svg';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            number: ''
        }
        this.handleChange=this.handleChange.bind(this);
        this.enterButton=this.enterButton.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.onChangeToMenu = this.onChangeToMenu.bind(this);
        this.onChangeToSearch = this.onChangeToSearch.bind(this);
    }

    componentDidMount() {
        this.getProductNumber();
        this.getUser();
    }

    componentDidUpdate() {
        this.getScroll();
    }

    getScroll() {
        window.addEventListener('scroll', function() {
            const scroll = window.pageYOffset;
            if(scroll >= 100) {
                document.getElementById('header-site').style.top = '-60px';
            } else {
                document.getElementById('header-site').style.top = '0';
            }
        });
    }

    handleChange(event) {
        this.setState({
            query: event.target.value
        })
    }

    enterButton(event) {
        var code = event.keyCode || event.which;
        var text = Number(document.getElementById("search_text").value.length);
        if(code === 13 && text !== 0) {
            event.preventDefault();
            document.getElementById("search_button").click();
        }  
    }
    
    mouseOver() {
        document.getElementById('account_option').style.display = 'block';
    }

    mouseOut() {
        document.getElementById('account_option').style.display = 'none';
    }

   

    accountOption() {
        if(Cookies.get('id')) {
            return (
                <div className="logout">
                    <a onClick={()=>(
                        Cookies.remove('id'),
                        window.location.reload()
                    )}>
                        Logout
                    </a>
                </div>
            )
        } else {
            return (
                <div className="login_signup">
                    <Link to="/user/signup">Signup</Link>
                    <Link to="/user/login">Login</Link>
                </div>
            )
        }
    }


    getProductNumber() {
        const id = Cookies.get('id');
        const api = LOCALHOST+'/cart/showCart/id='+id;
        Axios.get(api).then(res => {
            let result = res.data;
            let num = 0;
            for(let i in result) {
                num += result[i].number;
            }
            this.setState({
                number: num
            })
        })
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

    onChangeToMenu() {
        document.getElementById('top-row').style.display = 'block';
        document.getElementById('search-mobile').style.display = 'none';
    }

    onChangeToSearch() {
        document.getElementById('top-row').style.display = 'none';
        document.getElementById('search-mobile').style.display = 'block';
    }


    content() {
        if(Cookies.get('id')) {
            return (
                <div className="content">
                    <Link to="/user/manage=orders">
                        <img src={Order} />
                        <span>Orders</span>
                    </Link>

                    <Link to="/user/manage=address">
                        <img src={Address} />
                        <span>Address</span>
                    </Link>

                    <Link to="/user/manage=wishlist">
                        <img src={Wishlist} />
                        <span>Wishlist</span>
                    </Link>

                    <Link to="/user/manage=profile">
                        <img src={Profile} />
                        <span>Profile</span>
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="content">
                    <Link to="/user/login">
                        <img src={Order} />
                        <span>Orders</span>
                    </Link>

                    <Link to="/user/login">
                        <img src={Address} />
                        <span>Address</span>
                    </Link>

                    <Link to="/user/login">
                        <img src={Wishlist} />
                        <span>Wishlist</span>
                    </Link>

                    <Link to="/user/login">
                        <img src={Profile} />
                        <span>Profile</span>
                    </Link>
                </div>
            )
        }
    }


    render() {
        const { number } = this.state;
        return(
            <div className="header-site" id="header-site">
                <input type="checkbox" id="check" />
                <div className="top-row" id="top-row">
                    <div class="container">
                        <div className="menu-btn" onClick={ this.onChangeAppBar}>
                            <label for="check" style= {{ width: '100%' }}>
                                <div className="bar-1"></div>
                                <div className="bar-2"></div>
                                <div className="bar-3"></div>
                            </label>
                           
                        </div>
                        <Link to="/" className="logo-myweb"><img src={ Logo }></img></Link>

                        {/* mobile */}
                        <div className="search-btn" onClick={ this.onChangeToSearch }>
                            <img src={ SearchLogoMobile } />
                        </div>
                            <div class="my-cart-mobile">
                                <Link to='/shop/cart' style={{ width: '100%', margin: '0' }}>
                                    <img src={Cart} />
                                    <span id="number_cart_mobile" class="animate__animated animate__backInDown">{number}</span>
                                </Link>
                            </div>
                        {/* --------- */}
                        <div className="search-wrap">
                                <input type="text" id="search_text" 
                                    placeholder="Search our shop products" 
                                    value={this.state.query}
                                    onChange={this.handleChange}
                                    onKeyPress={this.enterButton}
                                />
                                <Link to={`/product/search=${this.state.query}`}>
                                    <button type="submit" id="search_button" className="search_button">
                                        <img src={SearchLogo} />
                                    </button>
                                </Link>
                               
                        </div>
                        <div className="topbar-texts">
                            <p className="free-delivery">
                                <img src={Delivery} style={{ "margin-bottom":"8px"}} />
                                <span>Free Delivery</span>
                            </p>
                            
                            <p className="free-return" >
                                <img src={Return} style={{ "margin-bottom":"8px"}} />
                                <span>Free Returns</span>
                            </p>

                            <p className="hotline">
                                <img src={Hotline} style={{ "margin-bottom":"8px"}}/>
                                <span>Hotline: +84 123456789</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mobile */}

                <div className="search-mobile" id="search-mobile">
                    <div className="back-to-menu" onClick={ this.onChangeToMenu }>
                        <img src={ BackToLeft }/>
                    </div>
                    <input type="text" id="search_text" className="search-text-mobile" 
                        placeholder="Search our shop products" 
                        value={this.state.query}
                        onChange={this.handleChange}
                        onKeyPress={this.enterButton}
                    />
                    <div className="btn-search-mobile" onClick={ this.onChangeToMenu }>
                        <img src={ SearchLogoMobile }/>
                    </div>
                </div>

                {/* ----------- */}
                
                <div className="main-nav" id="main-nav">
                    {/* Mobile */}
                    {
                        (Cookies.get('id')) ?
                        <div className="introduce-user">
                            <div className="introduce-user-name">
                                <h4>Hello</h4>
                                <span>{ this.state.firstName }</span>
                            </div>
                            <div className="introduce-user-function">
                                <div className="logout-mobile" onClick={()=>(
                                    Cookies.remove('id'),
                                    window.location.reload()
                                )}> 
                                    <img src={ LogOut }/>
                                </div>
                                
                                <div className="close-menu">
                                    <label for="check" style={{ width: '100%'}}>
                                        <img src={ Delete }/>
                                    </label>
                                </div>
                            
                                                        </div>
                            <div className="manage-user-mobile">
                                {/* <label for="check"> */}
                                    <Link to="/user/manage=orders">
                                        ORDERS
                                    </Link>
                                {/* </label> */}
                                <Link to="/user/manage=address">
                                    ADDRESS
                                </Link>
                                <Link to="/user/manage=wishlist">
                                    WISHLIST
                                </Link>
                                <Link to="/user/manage=profile">
                                    PROFILE
                                </Link>
                            </div>
                        </div> : 
                        <div className="introduce-user">
                            <div className="introduce-user-name">
                                <h4>Welcome</h4>
                                <h5>To access account and manage orders</h5>
                            </div>
                            <div className="introduce-user-function">
                                <div className="logout-mobile">
                                    {/* <img src={ LogOut }/> */}
                                </div>
                                
                                <div className="close-menu">
                                    <label for="check" style={{ width: '100%'}}>
                                        <img src={ Delete }/>
                                    </label>
                                </div>
                            
                                                        </div>
                            <div className="manage-user-mobile">
                                <Link to="/user/signup">
                                    Signup
                                </Link>
                                <Link to="/user/login">
                                    login
                                </Link>
                            </div>
                        </div>
                    }
                    
                  
                    {/* --------- */}
                    <div className="container-nav">
                        <ul>
                            <li>
                                <Link to="/product/type=indoor">Indoor Plants</Link>
                            </li>
                        
                            <li>
                                <Link to="/product/type=outdoor">Outdoor Plant</Link>      
                            </li>

                            <li>
                                <Link to="/product/type=office">Office Plants</Link>
                            </li>
                            
                            <li>
                                <Link to="/product/type=terrarium">Terrariums</Link>
                            </li>       

                            <li>
                                <Link to="/product/type=pot">Pots</Link>
                            </li>

                            <li>
                                <Link to="/product/type=seed">Seeds & Grow Kits</Link> 
                            </li>
                            
                            <li>
                                <Link to="/product/type=deal">Deals</Link>
                            </li>
                            
                            <li>
                                <Link to="/product/type=care">PlantCare & Decor</Link>
                            </li>

                            <li>
                                <Link to="/product/type=gift">Gifts</Link>
                            </li>
                        </ul>

                        
                        <div className="us-wrap">
                            <Link to="/shop/cart">
                            <div class="my-cart">
                                <img src={Cart} />
                                <span id="number_cart" class="animate__animated animate__backInDown">{number}</span>
                            </div>
                            </Link>
                            <div class="my-account" id="my-account" onMouseOver={()=>this.mouseOver()} onMouseOut={() => this.mouseOut()}>
                                <div className="icon">
                                    <img  src={Account}/>
                                </div>
                                
                                <div className="account_option" id="account_option">
                                    <div className="account_option_header" >
                                        {
                                            (Cookies.get('id'))?
                                                
                                                <div>
                                                    <h4>Hello {this.state.firstName}</h4>
                                                    <p>Wish you a good day</p>
                                                </div>
                                                : 
                                                <div>
                                                    <h4>Welcome</h4>
                                                    <p>To access account and manage orders</p>
                                                </div>
                                            
                                        }
                                        <this.accountOption />
                                    </div>
                                    <this.content />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-nav-opacity">
                    <label for="check" style={{ width: '100%', height: '100%' }}>

                    </label>
                </div>
            </div>
            
        );
    }
}

export default Header;