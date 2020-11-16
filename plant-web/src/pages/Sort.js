import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../css/Product.css';
import equal from 'fast-deep-equal';
import { LOCALHOST } from '../host.js'
class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productTotal: [],
            type: this.props.match.params.type,
            page: this.props.match.params.page,
            sort: this.props.match.params.sort,
            keyword: this.props.match.params.keyword
        }
        this.OnChangeImg = this.OnChangeImg.bind(this);
        this.OutChangeImg = this.OutChangeImg.bind(this);
    }

    componentDidMount() {
        this.getDB();
        this.getPage();
    }

    getDB() {
        const type = this.props.match.params.type;
        let page = this.props.match.params.page;
        let keyword = this.props.match.params.keyword;
        const sort = this.props.match.params.sort
        let api = LOCALHOST+"/";
        let apiProducts = LOCALHOST+"/";
        if(!page) {
            page = 1;
        }

        if(this.state.type){
            api = LOCALHOST+"/product/type=" + type + "/sort=" + sort + "/page=" + page;
            apiProducts = LOCALHOST+"/product/type=" + type;
        } else if(this.state.keyword) {
            api = LOCALHOST+"/product/search=" + keyword + "/sort=" + sort + "/page=" + page;
            apiProducts = LOCALHOST+"/product/search=" + keyword;
        }
        console.log(api);
        axios.get(api).then(res => {
            this.setState({ 
                products: res.data
            })
        });
        axios.get(apiProducts).then(res => [
            this.setState({
                productTotal: res.data
            })
        ])

    }

    componentDidUpdate(PrevProps) {
        if(!equal(this.props.match.params.sort, PrevProps.match.params.sort) || !equal(this.props.match.params.page, PrevProps.match.params.page)) {
            this.getDB();
            this.getPage();
        }
    
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

    getPage() {
        let p = this.props.match.params.page;
        if(!p) {
            p=1;
        }
        return p;
    }

    OutChangeImg(id, src1, src2) {
       document.getElementById('product'+id);
        var img = document.getElementById('img'+id);
        img.src = require("../images/products/"+src1);
        
    }

    displaySort() {
        document.getElementById('sorting_wrap').style.boxShadow = '0px 0px 5px 1px #0000032e';
        document.getElementById('option_sort').style.boxShadow = '0px 4px 4px 1px #0000032e';
        document.getElementById('option_sort').style.display = "block";
        document.getElementById('sorting_wrap').style.borderBottom = "none";
    }

    undisplaySort() {
        document.getElementById('sorting_wrap').style.boxShadow = 'none';
        document.getElementById('option_sort').style.boxShadow = 'none';
        document.getElementById('option_sort').style.display = "none";
        document.getElementById('sorting_wrap').style.borderBottom = "1px solid #e2e5f1";
    }

    renderType() {
        switch(this.props.match.params.type) {
            case 'indoor':
                return 'Shop All Indoor Plans';
            case 'outdoor':
                return 'Shop All Outdoor Plans';
            case 'office':
                return 'Shop All Office Plans';
            case 'terrarium':
                return 'Shop All Terrariums';
            case 'pot':
                return 'Shop All Pots';
            case 'seed':
                return 'Shop All Seeds & Grow Kits';
            case 'deal':
                return 'Shop All Deals';
            case 'care':
                return 'Shop All PlantCare & Decor';
            default:
                return 'Shop All Gifts';
        }
    }

    renderSort() {
        switch(this.props.match.params.sort) {
            case 'increase':
                return 'Sort Of Increase'
            case 'decrease':
                return 'Sort Of Decrease'
        }
    }

    render() {
        const {products , sort} = this.state;
        const { type, keyword } = this.props.match.params;   
        var page = this.getPage();
        if(!page || page<1) {
            page = 1;
        }
        const limit = 16;
        var pageTotal = Math.ceil(this.state.productTotal.length / limit);
        var numPage = [];
        const n = Number(page) + 2
        for(var i=page-2 ; i<=Number(page)+2 && i<=pageTotal; i++) {
            if(i>0) {
                numPage.push(i);
            }
        }
        return (
            <div class="body">
                <div className="page_header">
                    <div className="container">
                        <div className="page_heading">
                            <p>{ this.renderType() } / { this.renderSort() }</p>
                        </div>
                        <div className="sorting_wrap" id="sorting_wrap" onMouseOver={()=> this.displaySort()} onMouseOut={()=> this.undisplaySort()}>
                            <label>
                                Sort by: 
                                <span>
                                    What's New
                                </span>
                            </label>
                            {
                                (keyword) ?
                                <ul className="option_sort" id="option_sort" onMouseOver={()=> this.displaySort()} onMouseOut={()=> this.undisplaySort()}>
                                    <Link to="#" style={{margin: '0', width: '225px', float: 'left','text-decoration': 'none'}}><li className="latest">What's New</li></Link>
                                    <Link to="#" style={{margin: '0', width: '225px',  float: 'left','text-decoration': 'none'}}><li className="popular">Popularity</li></Link>
                                    <Link to={"/product/search="+keyword+"/sort=increase"} style={{margin: '0', width: '225px', float: 'left','text-decoration': 'none'}}><li className="lowfirst">Price: Low to Hight</li></Link>
                                    <Link to={"/product/search="+keyword+"/sort=decrease"} style={{margin: '0', width: '225px', float: 'left','text-decoration': 'none'}}><li className="hightfirst">Price: Hight to Low</li></Link>
                                </ul> :
                                <ul className="option_sort" id="option_sort" onMouseOver={()=> this.displaySort()} onMouseOut={()=> this.undisplaySort()}>
                                    <Link to="#" style={{margin: '0', width: '225px', float: 'left','text-decoration': 'none'}}><li className="latest">What's New</li></Link>
                                    <Link to="#" style={{margin: '0', width: '225px',  float: 'left','text-decoration': 'none'}}><li className="popular">Popularity</li></Link>
                                    <Link to={"/product/type="+type+"/sort=increase"} style={{margin: '0', width: '225px', float: 'left','text-decoration': 'none'}}><li className="lowfirst">Price: Low to Hight</li></Link>
                                    <Link to={"/product/type="+type+"/sort=decrease"} style={{margin: '0', width: '225px', float: 'left','text-decoration': 'none'}}><li className="hightfirst">Price: Hight to Low</li></Link>
                                </ul>
                            }
                            
                            
                        </div>
                    </div>
                </div>

                <div className="product_now">
                    <div className="container_product">
                        <div class="filter_wrap">
                            <h5>Filter</h5>
                            <label className="price_range">Price Range</label><br />
                            <input type="checkbox" className="type_price" name="price_range" value="0-10"/>
                            <lable className="value_price">USD 0 - 10</lable> <br />
                            <input type="checkbox" className="type_price" name="price_range" value="0-10"/>
                            <lable className="value_price">USD 10 - 20</lable> <br />
                            <input type="checkbox" className="type_price" name="price_range" value="0-10"/>
                            <lable className="value_price">USD 20 - 30</lable> <br />
                            <input type="checkbox" className="type_price" name="price_range" value="0-10"/>
                            <lable className="value_price">USD 30 - 50</lable> <br />
                            <input type="checkbox" className="type_price" name="price_range" value="0-10"/>
                            <lable className="value_price">USD 50++ </lable>
                        </div>
                        <div class="content_wrap">
                            {
                                products.map((product) => (   
                                    <Link to={"/product/id="+product._id}> 
                                        <div className="product_current"  id={ "product"+product._id }  onMouseOver={(id, src1, src2) => this.OnChangeImg(product._id, product.images[0], product.images[1])} onMouseOut={ (id, src1, src2) => this.OutChangeImg(product._id, product.images[0], product.images[1] )}>
                                            <div className="img_product">
                                                <img id={ "img" + product._id } src={require("../images/products/"+product.images[0])} />

                                            </div>
                                            <div className="name_product">
                                                <p>{ product.name }</p>
                                            </div>
                                            <div className="price_product">
                                                <p>USD { product.prices[0] }</p>
                                            </div>
                                        </div>
                                    </Link>                    
                                ))
                            }
                            <div className="pagination_wrap">
                                {
                                    (keyword) ?
                                    numPage.map(num => (
                                        (num != page) ?
                                        <Link to={"/product/search="+keyword+"/sort="+sort+"/page="+num} onClick={window.scrollTo(0, 0)}>{num}</Link> :
                                        <Link to={"/product/search="+keyword+"/sort="+sort+"/page="+num} style={{color: "#fff", background: "#000"}} onClick={window.scrollTo(0, 0)}>{num}</Link> 
                                    )) :
                                    numPage.map(num => (
                                        (num != page) ?
                                        <Link to={"/product/type="+type+"/sort="+sort+"/page="+num} onClick={window.scrollTo(0, 0)}>{num}</Link> :
                                        <Link to={"/product/type="+type+"/sort="+sort+"/page="+num} style={{color: "#fff", background: "#000"}} onClick={window.scrollTo(0, 0)}>{num}</Link> 
                                    ))
                                }
                            </div>        
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
}

export default Sort