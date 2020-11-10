import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import Axios from 'axios';
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
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        number: ''
    }
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

            </div> :
            <div>
              {/* {
                (!Cookies.get('id')) &&
                <Redirect from='/user/manage' to='/' /> 
              } */}
    
              <Header  number={this.state.number} />
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
              <Footer />
            </div>
          }
      </div>
    </Router>

  );}
}

export default App;
