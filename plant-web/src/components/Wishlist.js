import React, { Component } from 'react'
import '../css/Wishlist.css';
import Cookies from 'js-cookie';
import Axios from 'axios';
import cart_icon from '../images/cart_gray.svg';
import remove_icon from '../images/remove_gray.svg';
import Swal from 'sweetalert2'
import { LOCALHOST } from '../host.js'
class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: Cookies.get('id'),
            wishlist: [],
        }
    }

    componentDidMount() {
        this.getWishlist();
    }

    getWishlist = () => {
        const userId = this.state.userId;
        this.setState({
            wishlist: []
        })
        Axios.get(LOCALHOST+'/wishlist/show/userid='+userId)
        .then(res => {
            const wishlist = res.data;
            let array = []
            for(let i in wishlist) {
                const size = wishlist[i].size
                const productId = wishlist[i].productId;
                Axios.get(LOCALHOST+'/product/id='+productId)
                .then(resProduct => {
                    var t = 0;
                    for(let j in resProduct.data[0].sizes) {
                        if(resProduct.data[0].sizes[j] == size){
                            t = j;
                        }
                    }
                    const productInfor = {
                        id: wishlist[i]._id,
                        productId: productId,
                        name: resProduct.data[0].name,
                        price: resProduct.data[0].prices[t],
                        size: resProduct.data[0].sizes[t],
                        image: resProduct.data[0].images[0]
                    }
                    this.setState({
                        wishlist: this.state.wishlist.concat([productInfor])
                    })
                })
            }
       }) 
    }

    deleteWishlist(id) {
        Axios.post(LOCALHOST+'/wishlist/delete', {id: id})
        .then(() => {
            document.getElementById('wishlist'+id).style.height = '0';
            document.getElementById('wishlist'+id).style.zIndex = '0';
            document.getElementById('wishlist'+id).style.borderTop = 'none';
        })
    }

    addToCart = (productId, name, image, price, size) => {
        if(Cookies.get('id')) {
            Axios.get(LOCALHOST+'/product/id='+productId)
            .then(res => {
                const quantum = res.data[0].number;
                if(quantum > 0) {   // con so luong
                    const userId = Cookies.get('id');
                    const inforProduct = {
                        userId: userId,
                        productId: productId,
                        nameProduct: name,
                        image: image,
                        price: price,
                        size: size,
                        number: 1
                    }
                    Axios.post( LOCALHOST+'/cart/addCart', inforProduct)
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
                } else {    // het so luong
                    Swal.fire({
                        title: 'Your selected product is out of stock',
                        showClass: {
                          popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                          popup: 'animate__animated animate__fadeOutUp'
                        }
                      })
                }
            })
        } else {
            this.props.history.push('/user/login');
        }
       
    }

    getCart() {
        const id = Cookies.get('id');
        let api = LOCALHOST+'/cart/showCart/id='+id;
        Axios.get(api).then(res => {
            let products = res.data;
            let num = 0;
            for(let i in products) {
                num += products[i].number;
            }
            document.getElementById('number_cart').innerHTML = num;
            document.getElementById('number_cart_mobile').innerHTML = num;
        })
    }

    render() {
        const { wishlist } = this.state;
        return (
            <div className="wishlist-page">
                <div className="wishlist-title">
                    <h3>Wishlist</h3>
                </div>

                <div className="wishlist-table">
          
                    {
                        wishlist.map((product) => (
                            <div className="each-slide" id={'wishlist'+product.id}>
                                <div className="wishlist-table-container">
                                    
                                    <div className="wishlist-slide">
                                        <div className="wishlist-slide-img">
                                            <img src={require("../images/products/"+product.image)} />
                                        </div>      
                                        <div className="wishlist-slide-content">
                                            <div className="wishlist-slide-name">
                                                <h5>{product.name}</h5>
                                                <p>{product.size}</p>
                                            </div>
                                            <div className="wishlist-slide-price-add-moveto">
                                                <h2>USD {product.price}</h2>
                                                <div className="wishlist-function">
                                                    <div className="function-remove" onClick={() => this.deleteWishlist(product.id)}>
                                                        <img src={remove_icon} />
                                                        <span>Remove</span>
                                                    </div>
                                                    <div className="function-add-cart" onClick={() => this.addToCart(product.productId, product.name, product.image, product.price, product.size)}>
                                                        <img src={cart_icon} />
                                                        <span>Move to cart</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="page-none">
                    
                </div>
            </div>
        )
    }
}

export default Wishlist