import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import equal from 'fast-deep-equal';
import './App.css';
// import './css/Header.css';
import Product from './pages/Products.js';
import Header from './components/Header.js'
import Index from './pages/Index';
import Footer from './components/Footer.js';
import Detail from './pages/Detail.js'
import Search from './pages/Search.js';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Cart from './pages/Cart.js'
import Manage from './pages/Manage.js'
import Sort from './pages/Sort.js'
import HomeAdmin from './admin/pages/Home.js'
import Narbar from './admin/components/Narbar.js'
import orderTable from './admin/components/orderTable.js';
import productTable from './admin/components/productTable.js';
import userTable from './admin/components/userTable.js';
import addProduct from './admin/components/addProduct.js';
import updateProduct from './admin/components/updateProduct.js';
import Contact from './admin/components/contact.js';
import Join from './components/Join.js';
import Chat from './components/Chat.js';
import ChatAdmin from './admin/components/chatAdmin.js';
import Statistic from './admin/components/statistic.js'

import Message_icon from './images/message.svg';
import { LOCALHOST } from './host.js'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    const idUser = Cookies.get('id');
    axios.get(LOCALHOST+'/users/id='+idUser)
      .then(res => {
          this.setState({
            user: res.data
          }) 
      })
  }

  render(){
  
  return (
    <Router>
      <div className="App">
          {
            (Cookies.get('admin-plantweb')) ?
            <div className="admin-page">
              <Narbar />
              <productTable />
              <Route path="/" exact component={ HomeAdmin } />
              <Route path="/product" exact component={ productTable } />
              <Route path="/user" exact component={ userTable } />
              <Route path="/order" exact component={ orderTable } />
              {/* <Route path="/addproduct" exact component={ addProduct } />
              <Route path="/updateproduct/:id" exact component={ updateProduct } /> */}
              <Route path="/contact" exact component component={Contact} />
              <Route path="/contact/userId=:id" exact component component={ChatAdmin} />
              <Route path="/statistic/page=:page" exact component component={Statistic} />
            </div> 
            :
            <div>
              {/* {
                (!Cookies.get('id')) &&
                <Redirect from='/user/manage' to='/' /> 
              } */}
              <Header  number={this.state.number} />
              <div className="container">
                <input type="checkbox" id="message" />
                <Chat />
                <label for="message" style={{ width: "100%"}}>
                  <div className="button-message-view">
                    <img src={Message_icon}/>
                  </div>
                </label>
                
              </div>
    
              
              <Route path="/" render={()=> <Index />} exact component={ Index } />
              <Route path="/product/type=:type" exact component={ Product } />
              <Route path="/product/id=:id" exact component={ Detail } />
              <Route path="/product/type=:type/page=:page" exact component={ Product } />
              <Route path="/product/type=:type/sort=:sort" exact component={ Sort } />
              <Route path="/product/type=:type/sort=:sort/page=:page" exact component={ Sort } />
              <Route path="/product/search=:keyword" exact component={Search}/>
              <Route path="/product/search=:keyword/page=:page" exact component={Search} />
              <Route path="/product/search=:keyword/sort=:sort" exact component={Sort} />
              <Route path="/product/search=:keyword/sort=:sort/page=:page" exact component={Sort} />
              <Route path="/user/signup" exact component={Signup} />
              <Route path="/user/login" exact component={Login} />
              <Route path="/shop/cart" exact component={Cart} />
              <Route path="/user/manage=:function" exact component={Manage} />
              {/* <Route path="/realtime" exact component={Join}/> */}
              <Route path="/realtime/name=:name/room=:room" exact component={Chat} />
            
              <Footer />
            </div>
          }
      </div>
    </Router>

  );}
}

export default App;
