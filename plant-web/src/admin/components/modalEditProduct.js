import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../css/updateProduct.css'
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Axios from 'axios';

class ModalExample extends Component {  
  constructor(props) {
    super(props);
        this.state = {
            id: this.props.id,
            name: '',
            quantum: 0,
            type: '',
            sizes: [],
            prices: [],
            images: [],
            description: '',
            qtyImg: 0,
            qtyInfo: 0,
        }
        this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        // this.updateImages = this.updateImages.bind(this);
    }

    componentDidUpdate(nextProps) {
      console.log(nextProps.product);
      if(nextProps.product != this.props.product) {
         if(this.props.product)
          this.setState({
            name: this.props.product.name,
            quantum: this.props.product.number,
            type: this.props.product.type,
            sizes: this.props.product.sizes,
            prices: this.props.product.prices,
            images: this.props.product.images,
            description: this.props.product.description,
            qtyImg: this.props.product.images.length,
            qtyInfo: this.props.product.sizes.length,
          })
      }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    onSubmit(id, qty, sizes, prices) {
      let newSizes = [];
      let newPrices = [];

      for(let i=0 ; i<qty ; i++) {
        if(sizes[i]) {
          newSizes[i] = sizes[i];
          newPrices[i] = prices[i];
        }
      }

      console.log(Number(this.state.quantum));
      const data = {
            id: id,
            name: this.state.name,
            prices: newPrices,
            sizes: newSizes,
            quantum: Number(this.state.quantum),
            description: this.state.description,
            type: this.state.type,
        };
        
        console.log(data);
        Axios.post('http://localhost:9000/product/updateproduct', data)
        .then(res => {
            if(res.data.success) {
                window.location.reload()
            }
        })
    }

    updateImages(id, qty, images) {
        let newImages = [];
        for(let i=0 ; i<qty ; i++) {
          if(images[i]) {
            newImages[i] = images[i];
          }
        }
        const data = {
            id: id,
            images: newImages
        };
      
        Axios.post('http://localhost:9000/product/updateimages', data)
        .then(res => {
            if(res.data.success) {
                window.location.reload()
            }
        })
    }

  render() {
    const { name, prices, sizes, images, description, type, quantum, qtyImg, qtyInfo } = this.state

    console.log(quantum);
    const { className,
      modalProps,
      toggle,
      id,
      product,
    } = this.props

      let loop_type = [];
      let loop_image = [];
      if(modalProps) {
        if(images) {
          for(let i=0 ; i<qtyImg ; i++) {
            loop_image.push(i);
          }
        }
        if(sizes) {
          for(let i=0 ; i<qtyInfo ; i++) {
            loop_type.push(i);
          }
        }
      }
    return (
      <div>
        <Modal isOpen={modalProps} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>UPDATE PRODUCT</ModalHeader>
          <ModalBody>
            {
              (modalProps) && 
                <div className="container-product">
                  <div className="container-left">
                    <h5>Image</h5>
                    
                    <p onClick={() => {
                      if(qtyImg < 8) {
                        this.setState({
                            qtyImg: qtyImg + 1
                        })
                      }
                    }}>+</p>
                    
                    <p onClick={() => {
                      if(qtyImg > 1) {
                        this.setState({
                            qtyImg: qtyImg - 1
                        })
                      }
                    }}>-</p>

                      <div className="content-image">
                        {
                          (product.images) &&
                          loop_image.map((data, i) => (
                            <div className="file-image">
                              <input type='file'
                                onChange={(event) => {
                                  const temp = [...this.state.images];
                                  temp[i] = event.target.value.slice(12, event.target.value.length);
                                  this.setState({ images: temp})
                                }}
                              />
                            </div>
                          ))
                        }
                      </div>
                  </div>
  
                  <div className="container-right">
                    <h5>Information</h5>
                    
                    <p onClick={() => {
                      if(qtyInfo < 4) {
                        this.setState({
                            qtyInfo: qtyInfo + 1
                        })
                      }
                    }}>+</p>

                    <p onClick={() => {
                      if(qtyInfo > 1) {
                        this.setState({
                            qtyInfo: qtyInfo - 1
                        })
                      }
                    }}>-</p>
                    
                    <div className="content-info">
                      <div className="info-name">
                        <TextField id="standard-basic" value={name} onChange={this.onChange} name="name" label="Name" />
                      </div>
                      {
                        (product.sizes) &&
                        loop_type.map((value, i) => (
                          <div>
                            <div className="info-price">
                              <TextField id="standard-basic" value={prices[i]} 
                              onChange={(event) => {
                                const temp = [...this.state.prices];
                                temp[i] = Number(event.target.value);
                                this.setState({ prices: temp})
                              }}
                              name="prices" label="Price" />
                            </div>
                            
                            <div className="info-size">
                              <TextField id="standard-basic" value={sizes[i]} 
                              onChange={(event) => {
                                const temp = [...this.state.sizes];
                                temp[i] = event.target.value;
                                this.setState({ sizes: temp})
                              }}
                              name="sizes" label="Size" />
                            </div>
                          </div>
                        ))
                      }
  
  
                      <div className="info-qty">
                        <TextField id="standard-basic" value={quantum} onChange={this.onChange} name="quantum" label="Qty" />
                      </div>
  
                      <div className="info-type">
                        <select className="select-option" onChange={this.onChange} name="type">
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
  
  
                      <div className="info-desciption">
                      <TextareaAutosize  name="description" value={description} onChange={this.onChange} style={{ width: '100%', height: '120px', marginTop: 10 }} aria-label="empty textarea" placeholder="Description" />
                      </div>
                    </div>
                  </div>
              </div>
            }
          </ModalBody>
          <ModalFooter>
           <Button color="primary" onClick={() => this.updateImages(id, qtyImg, images)}>Update Image</Button>{' '}
            <Button color="primary" onClick={()=>this.onSubmit(id, qtyInfo, sizes, prices)}>Update Info</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;