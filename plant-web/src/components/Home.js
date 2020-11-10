import React, { Component } from 'react';
import '../css/Home.css';
import 'animate.css';
import Feature_Image_1 from '../images/feature_image_1.jpg';
import Feature_Image_2 from '../images/feature_image_2.jpg';
import Feature_Image_3 from '../images/feature_image_3.jpg';
export default class Home extends Component {
    constructor(props) {
        super(props);
    }
   

    render() {
    
        return(
            <div className="home-row">
                    <div className="container">
                        <div className="featured-products">
                            <div className="featured-tabs">
                                <a>EXOTIC PLANTS COLLECTION</a>
                            </div>
                            {/* <h1 class="animate__animated animate__backInDown">An animated element</h1>
                            <div class="animate__animated animate__bounce animate__delay-2s">Example</div>
                            <div className="featured-tabs">
                                <a>EXOTIC PLANTS COLLECTION</a>
                            </div> */}
                            {/* {
                                (window.pageYOffset > 200) ? 
                                <h1 class="animate__animated animate__backInLeft">An animated element</h1>:
                                false
                            } */}
                            <div className="featured-tabs">
                                <div className="featured-image1">
                                    <img src={Feature_Image_1} />
                                </div>
                                <div className="featured-image2">
                                    <img src={Feature_Image_2} />
                                </div>
                                <div className="featured-image3">
                                    <img src={Feature_Image_3} />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}