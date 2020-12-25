import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import Axios from 'axios';
import { LOCALHOST } from '../host.js'

import '../css/Orders.css'
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));
  

  export default function ControlledAccordions() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [orders, setOrders] = useState([]);
    const [valid, setValid] = useState(true)
    useEffect(() => {
        const idUser = Cookies.get('id');
        const api = LOCALHOST+'/order/showOrder/id='+idUser;
        Axios.get(api).then(res => {
            if(valid) {
                setOrders(res.data.reverse());
                setValid(false)
            }
        })
    })
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const cancellationOrder = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "Your order will be canceled",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Canceled!',
            'Your order has been successfully canceled',
            'success'
          )
          Axios.post(`${LOCALHOST}/order/update`, {id: id, orderStatus: 4})
          .then(() => { 
            window.location.reload();
          })
        }
      })
     
    }
  return (
    <div className="orders-page">
        <div className="orders-title">
            <h3>Orders</h3>
        </div>  
            {
                orders.map((order, index) => (
                    <div className="orders-content">
                        <div className={classes.root}>
                            <div>
                                <Accordion expanded={expanded === 'panel'+index+1} onChange={handleChange( 'panel'+index+1)}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    >
                                    <div className="headding-orders">
                                      <p># {order._id}</p>
                                    </div>
                                    <div className="delivery-time">
                                      <p>{order.currentTime}</p>
                                    </div>
                                    <div className="orders-status">
                                      {
                                        (order.orderStatus == 0)
                                        ? <p style={{ color: 'blue' }}>To Pay</p>
                                        : (order.orderStatus == 1)
                                        ? <p style={{ color: 'blue' }}>To Ship</p>
                                        : (order.orderStatus == 2)
                                        ? <p style={{ color: 'blue' }}>To Receive</p>
                                        : (order.orderStatus == 3)
                                        ? <p style={{ color: '#1d9422' }}>Completed</p>
                                        : <p style={{ color: '#ff5722' }}>Cancelled</p>
                                      }
                                    </div>
                                    </AccordionSummary>
                                      
                                    {order.productInfo.map((product, index) => {
                                      return (
                                        <div className="products-in-order">
                                            <div className="products-in-order-img">
                                              <img src={require('../images/products/' + product.image)}/>
                                            </div>
                                            <div className="products-in-order-info">
                                                <h5>{product.nameProduct}</h5>
                                                <p>{product.size}</p>
                                                <span>x {product.number}</span>
                                            </div>
                                            <div className="products-in-order-price">
                                                <h5>{product.price} USD</h5>
                                            </div>
                                        </div>
                                        )
                                      })
                                    }
                                    <div className="orders-summary">
                                      <div className="client-info">
                                        <p><b>Name</b>: {order.userInfo[0].name}</p>
                                        <p><b>Phone</b>: {order.userInfo[0].phone}</p>
                                        <p><b>Address</b>: {order.userInfo[0].address}</p>
                                        <p><b>Delivery time</b>: {order.shippingTime}</p>
                                      </div>
                                      <div className="payment-info">
                                        <div className="orders-detail">
                                          <h5>Total: </h5>
                                          <span>{order.total} USD</span>
                                          <h5>Shipping Fee: </h5>
                                          <span>{order.shippingFee} USD</span>
                                          <h5>Coupon/gift:</h5>
                                          {
                                            (order.voucher > 0) 
                                            ? <span> - {order.voucher} USD</span>
                                            : <span></span>
                                          }
                                          <h5 className="payment-h5">Payment: </h5>
                                          <span className="payment-span">{order.total + order.shippingFee + order.voucher} USD</span>
                                        </div>
                                        {
                                          order.orderStatus == 0  || order.orderStatus == 1
                                          ? 
                                          <div className="cancellation-order">
                                            <button className="btn-cancellation-order" onClick={() => cancellationOrder(order._id)}>Cancel</button>
                                          </div>
                                          : null
                                        }
                                      </div>
                                    </div>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                ))
            }
    </div>
  );
}