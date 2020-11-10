import React, { Component } from 'react';
import axios from 'axios';

import '../css/Product.css';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }

    }

    componentDidMount() {
        const {type: {params}} = this.props;

        console.log({type: {params}});

        axios.get('http://localhost:8080/').then(res => {
            this.setState({ 
                products: res.data
            })
        });
    }
    render() {
        const {products} = this.state;
        console.log(products);
        return (
            <div class="body">
                <div className="page_header">
                    <div className="container">
                        <div className="page_heading">
                            <p>Shop All Corporate</p>
                        </div>
                        <div className="sorting_wrap">
                            <label>
                                Sort by: 
                                <span>
                                    What's New
                                </span>
                            </label>
                            
                        </div>
                    </div>
                </div>

                <div className="product_now">
                    <div className="container">
                        <div class="filter_wrap">
                            <h3>Filter</h3>
                        </div>
                        <div class="content_wrap">
                            {
                                products.map(product => (

                                    <div className="product_current">
                                        <div className="img_product">
                                            <img src={ product.images[0] } />
                                        </div>
                                        <div className="name_product">
                                            <p>{ product.name }</p>
                                        </div>
                                        <div className="price_product">
                                            <p>USD { product.price }</p>
                                            <p>Type: { product.type }</p>
                                        </div>
                                    </div>
                                ))
                            }      
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index