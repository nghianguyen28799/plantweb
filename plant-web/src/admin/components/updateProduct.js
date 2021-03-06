import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageUploader from 'react-images-upload';
import Axios from 'axios';
import '../css/addProduct.css'


class updateProduct extends Component {
    constructor(props) {
        super(props);
            this.state = {
                quantum_type: 1,
                quantum_image: 1,
                name: '',
                quantum: 0,
                type: '',
                sizes: [],
                prices: [],
                images: [],
                data: [],
                description: '',
            }
            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.updateImages = this.updateImages.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params
        console.log(id);
        Axios.get('http://localhost:9000/product/id='+id)
        .then(res => {
            this.setState({
                name: res.data[0].name,
                images: res.data[0].images,
                sizes: res.data[0].sizes,
                prices: res.data[0].prices,
                quantum: res.data[0].number,
                type: res.data[0].type,
                description: res.data[0].description,
                quantum_type: res.data[0].sizes.length,
                quantum_image: res.data[0].images.length
            })
        })
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    onSubmit() {
        const data = {
            id: this.props.match.params.id,
            name: this.state.name,
            prices: this.state.prices,
            sizes: this.state.sizes,
            quantum: this.state.quantum,
            description: this.state.description,
            type: this.state.type,
        };
    
        Axios.post('http://localhost:9000/product/updateproduct', data)
        .then(res => {
            if(res.data.success) {
                window.location.reload()
            }
        })
    }

    updateImages() {
        const data = {
            id: this.props.match.params.id,
            images: this.state.images
        };
    
        Axios.post('http://localhost:9000/product/updateimages', data)
        .then(res => {
            if(res.data.success) {
                window.location.reload()
            }
        })
    }

    

    render(){
        const { quantum_type, quantum_image, name, prices, sizes, images, description, type, quantum } = this.state
        let loop_type = [];
        let loop_image = [];
        for(let i=0 ; i<quantum_type ; i++) {
            loop_type.push(i);
        }
        for(let i=0 ; i<quantum_image ; i++) {
            loop_image.push(i);
        }

        return (
            <div className="addProduct-page">
                <div className="container-addproduct">
                    <div className="title-table">
                        <h3>Update Addition</h3>
                    </div>
                    <div className="input-table">
                        <div className="input-table-image">
                            {/* <input type="number" style={{ margin: '20px 0' }} value={quantum_image} onChange={(event) => (event.target.value > 0 && event.target.value < 10) ? this.setState({quantum_image: event.target.value}) : ()=>{}}/> */}
                            {
                                loop_image.map(index => (
                                    <div className="type-file">
                                        <input type='file' name={'image'+index} 
                                        onChange={(event) => {
                                            const temp = [...this.state.images];
                                            temp[index] = event.target.value.slice(12, event.target.value.length);
                                            this.setState({ images: temp})
                                        }}/>
                                    </div>
                                ))
                            }
                            <div className="button-switch-quantum">
                                <div className="button-decrease" onClick={() => {
                                    if(quantum_image > 1) {
                                        this.setState({
                                            quantum_image: quantum_image - 1
                                        })
                                    }
                                    
                                }}>
                                    <h5>Decrease</h5>
                                </div>
                                <div className="button-increase" onClick={() => {
                                   if(quantum_image < 8) {
                                    this.setState({
                                        quantum_image: quantum_image + 1
                                    })
                                }
                                }}>
                                    <h5>Increase</h5>
                                </div>
                            </div>
                            <Button style={{ margin: '20px 0' }} onClick={this.updateImages} variant="contained" color="primary" >Update Images</Button>
                        
                        </div>


                        <div className="input-table-info">
                            {/* <input type="number" style={{ margin: '20px 0' }} value={quantum_type} onChange={(event) => (event.target.value > 0 && event.target.value < 6) ? this.setState({quantum_type: event.target.value}) : ()=>{}}/> */}
                            
                            <div className="content-info">
                                <div className="title-info">
                                    <h5>Name:</h5>
                                </div>
                                <div className="action-info">
                                    <TextField id="standard-basic" value={name} name="name" label="Name" onChange={this.onChange} />
                                </div>
                            </div>
                            

                            <div className="content-info">
                                <div className="title-info">
                                    <h5>Prices & Sizes</h5>
                                </div>
                                <div className="action-info">
                                    {
                                        loop_type.map(index => (
                                            <div style={{ width: '100%', float: 'left' }}>
                                                <div style={{ width: '45%', float: 'left', marginRight: 30 }}>
                                                    <TextField id="standard-basic" 
                                                    value={prices[index]}
                                                    onChange={(event) => {
                                                        const temp = [...this.state.prices];
                                                        temp[index] = event.target.value;
                                                        this.setState({ prices: temp})
                                                    }}
                                                    name='price' label={'Price '+Number(index+1)} />
                                                </div>

                                                <div style={{ width: '45%', float: 'left' }}>
                                                    <TextField id="standard-basic" 
                                                    value={sizes[index]}
                                                    onChange={(event) => {
                                                        const temp = [...this.state.sizes];
                                                        temp[index] = event.target.value;
                                                        this.setState({ sizes: temp})
                                                    }}
                                                    name='size' label={'Size '+Number(index+1)} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>


                            <div className="content-info">
                                <div className="title-info">
                                    <h5>Type:</h5>
                                </div>
                                <div className="action-info" >
                                    <select className="select-option" name="type" onChange={this.onChange}>
                                        <option value="indoor">Indoor</option>
                                        <option value="outdoor">Outdoor</option>
                                        <option value="offfice">Office</option>
                                        <option value="terrarium">Terrarium</option>
                                        <option value="pot">Pot</option>
                                        <option value="seek">Seek</option>
                                        <option value="deal">Deal</option>
                                        <option value="care">Plant Care</option>
                                        <option value="gift">Gift</option>
                                    </select>
                                </div>
                            </div>

                            <div className="content-info">
                                <div className="title-info">
                                    <h5>Quantum:</h5>
                                </div>
                                <div className="action-info">
                                    <TextField id="standard-basic" value={Number(quantum)} name="quantum" onChange={this.onChange} type="number" label="Quantum" />
                                </div>
                            </div>

                            <div className="content-info">
                                <div className="title-info">
                                    <h5>Description:</h5>
                                </div>
                                <div className="action-info">
                                    <TextareaAutosize  name="description" value={description} onChange={this.onChange}  style={{ width: '100%', height: '120px', marginTop: 10 }} aria-label="empty textarea" placeholder="Description" />
                                </div>
                            </div>
   
                            <div className="button-switch-quantum">
                                <div className="button-decrease" onClick={() => {
                                    if(quantum_type > 1) {
                                        this.setState({
                                            quantum_type: quantum_type - 1
                                        })
                                    }
                                    
                                }}>
                                    <h5>Decrease</h5>
                                </div>
                                <div className="button-increase" onClick={() => {
                                   if(quantum_type < 5) {
                                    this.setState({
                                        quantum_type: quantum_type + 1
                                    })
                                }
                                }}>
                                    <h5>Increase</h5>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '20px 0', clear: 'both', width: '100%', borderTop: '1px solid' }}>
                            <Button variant="contained" color="primary" onClick={this.onSubmit}>Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default updateProduct;