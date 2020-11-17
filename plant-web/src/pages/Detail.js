import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactImageZoom from 'react-image-zoom';
import '../css/Detail.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import watering from '../images/watering.svg';
import light from '../images/light.svg';
import temperature from '../images/temperature.svg';
import repotting from '../images/repotting.svg';
import wishlist from '../images/wishlist.svg'
import Carousel from "react-elastic-carousel";
import Item from "../components/Item";
import equal from 'fast-deep-equal';
import { LOCALHOST } from '../host.js'
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            qty: 1,
            size: '',
            price: '',
            name: '',
            added_wishlist: false,
            similarProducts: [],
        }
        this.changeImg = this.changeImg.bind(this);
        this.OnChangeImg = this.OnChangeImg.bind(this);
        this.OutChangeImg = this.OutChangeImg.bind(this);
    }
    
    increase() {
        var qty = this.state.qty
        this.setState({
            qty: qty + 1
        })
        
    }

    decrease() {
        var qty = this.state.qty;
        this.setState({
            qty: qty - 1
        })
        if(qty < 2) {
            this.setState({
                qty: 1
            })
        }
    }

    componentDidMount() {
        this.getProduct();
        this.getSimilarProducts();
    }

    componentDidUpdate(PrevProps) {
        if(!equal(this.props.match.params.id, PrevProps.match.params.id)) {
            this.getProduct();
            this.getSimilarProducts();
        }
    }

    getProduct() {
        const id = this.props.match.params.id;
        let apiId = LOCALHOST+"/product/id=" + id;
        axios.get(apiId).then(res => {
            this.setState({ 
                product: res.data,
                price: res.data[0].prices[0],
                size: res.data[0].sizes[0],
                name: res.data[0].name
            })
            const size = res.data[0].sizes[0];
            const data = {
                userId : Cookies.get('id'),
                productId : this.props.match.params.id,
                size : size,
            }
            axios.post(LOCALHOST+'/wishlist/finddata', data)
            .then(res => {
                if(res.data.added) {
                    this.setState({
                        added_wishlist: true
                    })
                }else {
                    this.setState({
                        added_wishlist: false
                    })
                }
            })
        });
    }

    getSimilarProducts() {
        const id = this.props.match.params.id;
        let apiId = LOCALHOST+"/product/id=" + id;
        let type = '';
        axios.get(apiId).then(res => {
            type = res.data[0].type;
            axios.get(LOCALHOST+'/product/type='+type)
            .then(response => {
                var currentIndex = -1;
                for(let j in response.data) {
                   if(response.data[j]._id == id) {
                       currentIndex = j;
                   } 
                }
                const quantity = response.data.length;
                let i = 0;
                let arr = [];
                if(quantity > 8) {
                    while (i<=7) {
                        const random = Math.floor(Math.random() * quantity)
                        let checkExist = arr.indexOf(random);
                        if(checkExist == -1 && random != currentIndex) {
                            arr.push(random);
                            i+=1;
                        }
                    }
                } else {
                    while (i<=quantity-2) {
                        const random = Math.floor(Math.random() * quantity)
                        let checkExist = arr.indexOf(random);
                        if(checkExist == -1 && random != currentIndex) {
                            arr.push(random);
                            i+=1;
                        }
                    }
                }
                axios.post(LOCALHOST+'/product/similarproducts', {arr: arr, id: id, type: type})
                .then(resData => {
                    this.setState({
                        similarProducts: resData.data
                    })
                })
            })
        })
    }

    changeImg(img) {
        // var image = document.getElementById('img'+img).src;
        // var wrap = document.getElementById('img_detail');
        // wrap.children[0].src=image;
                
        this.setState({imageTagert: img})
    }

    changeSize(size, price) {
        this.setState({
            price: price,
            size: size
        })
        const data = {
            userId : Cookies.get('id'),
            productId : this.props.match.params.id,
            size : size,
        }
        axios.post(LOCALHOST+'/wishlist/finddata', data)
        .then(res => {
            if(res.data.added) {
                this.setState({
                    added_wishlist: true
                })
            }else {
                this.setState({
                    added_wishlist: false
                })
            }
        })
    }

    addtoCart() {
        if(Cookies.get('id')) {
            const userId = Cookies.get('id');
            const inforProduct = {
                userId: Cookies.get('id'),
                productId: this.props.match.params.id,
                nameProduct: this.state.name,
                image: this.state.product[0].images[0],
                price: this.state.price,
                size: this.state.size,
                number: this.state.qty
            }
            axios.post('/cart/addCart', inforProduct)
            .then(res=> {
                Swal.fire({
                position: 'top-mid',
                icon: 'success',
                title: "Product added successfully",
                showConfirmButton: false,
                timer: 1500
                })
                this.getCart();
            })
        }
        else {
            this.props.history.push('/user/login');
        }
    }

    getCart() {
        const id = Cookies.get('id');
        let api = LOCALHOST+'/cart/showCart/id='+id;
        axios.get(api).then(res => {
            let products = res.data;
            let num = 0;
            for(let i in products) {
                num += products[i].number;
            }
            document.getElementById('number_cart').innerHTML = num;
            document.getElementById('number_cart_mobile').innerHTML = num;
        })
    }

    addToWishlist() {
        const data = {
            userId : Cookies.get('id'),
            productId : this.props.match.params.id,
            size : this.state.size,
        }
        console.log(data);
        axios.post(LOCALHOST+'/wishlist/create', data)
        .then(() => {
            this.setState({
                added_wishlist: true
            })
        })
    }

    viewWishlist = () => {
        this.props.history.push('/user/manage=wishlist');
    }


    OnChangeImg(id, src1, src2) {
        document.getElementById('product'+id);
        var img = document.getElementById('img'+id);
        if(src2) {
            img.src = require("../images/products/"+src2);
        }
        else {
            img.src = require("../images/products/"+src1);
        }
    }

    OutChangeImg(id, src1, src2) {
        document.getElementById('product'+id);
        var img = document.getElementById('img'+id);
        img.src = require("../images/products/"+src1);
          
    }

    render() {
        const { product }= this.state;
        console.log(this.state.size);
        const breakPoints = [
            { width: 1, itemsToShow: 1 },
            { width: 300, itemsToShow: 2, itemsToScroll: 2 },
            { width: 300, itemsToShow: 3 },
            { width: 300, itemsToShow: 4 },
            { width: 300, itemsToShow: 5 },
            { width: 300, itemsToShow: 6 }
          ];

        return (
            <div className="body">
                <div className="page_header">
                    <div className="container">
                        <div className="page_heading">
                            <p> Detail </p>
                        </div>
                    </div>
                </div>
                {
                product.map(detail => ( 
                    <div className="container">
                        <div className="img_wrap">
                            <div className="img_detail" id="img_detail">
                                <ReactImageZoom 
                                    width= {400}
                                    height= {565}
                                    zoomWidth= {500}
                                    margin-left={20}
                                    transform='none'
                                    img={(this.state.imageTagert) ? require('../images/products/'+this.state.imageTagert) : require('../images/products/'+detail.images[0])}
                                />
                            </div>
                            <div className="img_other">
                                {
                                    detail.images.map(img => (
                                        <img src={ require("../images/products/"+img) } onClick={(image) => {this.changeImg(img)}} />
                                    ))
                                }
                            </div>
                        </div>
                        <div className="infor_wrap">
                            <div className="infor_name">
                                <p>{ detail.name }</p>
                                {
                                    (detail.number == 0) ?
                                    <h5>Sout out</h5> :
                                    () => {}
                                }
                                
                            </div>
                            <div className="infor_price">
                                <p>USD { this.state.price }</p>
                            </div>
                            <div className="infor_size">
                                <label>Choose Height:</label>
                                <br />
                                { 
                                    detail.sizes.map((size, index) => (
                                        (this.state.size == size) ? 
                                        <p style={{ border: "1px solid #2a2a2a", color: "#2a2a2a", "font-weight": "500"}}id={'size-'+ index} onClick={() => this.changeSize(size, detail.prices[index])}> {size} </p> :
                                        <p id={'size-'+ index} onClick={() => this.changeSize(size, detail.prices[index])}> {size} </p>
                                    ))
                                     
                                }
                                
                            </div>
                            <div className="infor_qty">
                                <p>Qty</p>
                                <button className="button_reduce" onClick={() => this.decrease()}></button>
                                {
                                    (detail.number == 0) ?
                                    <input type="text" disabled="disabled" value="0"/> :
                                    <input type="text" disabled="disabled" name="qty" value={this.state.qty}/>
                                }
                                {
                                    (this.state.qty == this.state.product[0].number) ?
                                    <button className="button_raise" disable></button> : 
                                    <button className="button_raise" onClick={() => this.increase()}></button>
                                }
                                {
                                    (detail.number == 0) ?
                                    <button className="addToCart">add to cart</button> :
                                    <button onClick={() => (this.addtoCart())} className="addToCart">add to cart</button>
                                }
                               
                                {
                                    (!this.state.added_wishlist) ?
                                    <div className="add-to-wishlist" onClick={() => this.addToWishlist()}>
                                        <img src={wishlist} />
                                        <span>Add to wishlist</span>
                                    </div> :
                         
                                        <div className="add-to-wishlist" onClick={() => this.viewWishlist()}> 
                                            <img src={wishlist} />
                                            <span>View wishlist</span>
                                        </div>
             
                                }
                                <h5 className="number_product">{this.state.product[0].number} available products</h5>
                            </div>

                        </div>  
                        <div className="care_wrap">
                            <h2>Plant Care</h2><br />
                            <div className="care">
                                <div className="care_icon">
                                    <img src={watering} />
                                </div>
                                <div className="care_content">
                                    <h3>Watering</h3>
                                    <p>Spray water once in 2 weeks to moisten soil but be sure water does not pool up at the bottom of container which can cause rotting. Allow soil to dry between waterings.</p>
                                </div>
                            </div>

                            <div className="care">
                                <div className="care_icon">
                                    <img src={light} />
                                </div>
                                <div className="care_content">
                                    <h3>Light</h3>
                                    <p>Bright indoor light or indirect sun. 6 hours to 8 hours</p>
                                </div>
                            </div>

                            <div className="care">
                                <div className="care_icon">
                                    <img src={temperature} />
                                </div>
                                <div className="care_content">
                                    <h3>Temperature</h3>
                                    <p>18°C to 25°C</p>
                                </div>
                            </div>

                            <div className="care">
                                <div className="care_icon">
                                    <img src={repotting} />
                                </div>
                                <div className="care_content">
                                    <h3>Repotting</h3>
                                    <p>Re-pot them as they grow. Prune dead or dying flytraps. Don’t let the flytraps flower. Resist poking the traps.</p>
                                </div>
                            </div>
                        </div>    
                        <div className="description_wrap">
                            <h2>Description of Plan</h2>
                            <p>{detail.description}</p>
                        </div>  
                    </div>
                ))                       
                }
                <div className="similar-products-div">
                    <div className="container">
                        <div className="featured-tabs">
                            <a>Other Similar Products</a>
                        </div>

                        <div className="similar-products-carousel">
                            <Carousel breakPoints={breakPoints}>  
                                {
                                    this.state.similarProducts.map(product => (
                                        <Item>
                                            <Link to={"/product/id="+product._id}>
                                                <div className="each-similar-products" id={ "product"+product._id }  onMouseOver={(id, src1, src2) => this.OnChangeImg(product._id, product.images[0], product.images[1])} onMouseOut={ (id, src1, src2) => this.OutChangeImg(product._id, product.images[0], product.images[1] )}>
                                                    <div className="img-similar-products" id={'img'+product._id}>
                                                        <img src={require("../images/products/"+product.images[0])}/>
                                                    </div>
                                                    <div className="name-similar-products">
                                                        <h5>{product.name}</h5>
                                                    </div>
                                                    <div className="price-similar-products">
                                                        <h5>USD {product.prices[0]}</h5>
                                                    </div>
                                                </div>  
                                            </Link>
                                        </Item>
                                    ))
                                }
                            </Carousel>
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
}

export default Detail;