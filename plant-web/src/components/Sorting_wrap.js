import React, { Component } from 'react'
import { Link } from "react-router-dom";
class SortingWrap extends Component {
    render() {
        const { type } = this.props.match.params;   
        return (
            <div className="sorting_wrap" id="sorting_wrap" 
                onMouseOver={()=> this.displaySort()} 
                onMouseOut={()=> this.undisplaySort()}
            >
                <label>
                    Sort by: 
                    <span>
                        What's New
                    </span>
                </label>
                <ul className="option_sort" id="option_sort" onMouseOver={()=> this.displaySort()} onMouseOut={()=> this.undisplaySort()}>
                    <Link to="#" style={{margin: '0', width: '225px', float: 'left','text-decoration': 'none'}}><li className="latest">What's New</li></Link>
                    <Link to="#" style={{margin: '0', width: '225px',  float: 'left','text-decoration': 'none'}}><li className="popular">Popularity</li></Link>
                    <Link to={"/product/type="+type+"/sort=increase"} style={{margin: '0', width: '225px', float: 'left','text-decoration': 'none'}}><li className="lowfirst">Price: Low to Hight</li></Link>
                    <Link to={"/product/type="+type+"/sort=decrease"} style={{margin: '0', width: '225px', float: 'left','text-decoration': 'none'}}><li className="hightfirst">Price: Hight to Low</li></Link>
                </ul>
                
            </div>
        )
    }
}

export default SortingWrap