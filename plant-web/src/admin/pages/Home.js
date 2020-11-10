import React, { Component } from 'react'
import productTable from '../components/productTable.js'
import Narbar from '../components/Narbar.js'
import '../css/Home.css';
import Axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        Axios.get("http://localhost:9000/")
        .then(res => {
            this.setState({
                data: res.data
            })
        })
    }
    render() {
        console.log(this.state.data);
        return(
            <div>
                <div className="manage-div">
                    <div className="table-manage">
                        <p>123123</p>
                    </div>
                </div>

            </div> 
        )
    }
}
export default Home 