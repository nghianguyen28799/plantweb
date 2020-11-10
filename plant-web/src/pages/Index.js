import React, { Component } from 'react';
import Header from '../components/Header.js';

import CarouselForm from '../components/Carousel.js';
import Home from '../components/Home.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default class Index extends Component {
    render() {
        return (
            <div className="body">
                <CarouselForm />
                <Home />

            </div>
        )
    }
}