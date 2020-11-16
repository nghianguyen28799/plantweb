import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Cookies from 'js-cookie';
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
                setOrders(res.data.reverse())
                setValid(false)
            }
            
        })
    })
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
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
                                      <p>Waiting</p>
                                    </div>
                                    </AccordionSummary>
                                      
                                    {order.productId.map((product, index) => {
                                      return (
                                        <div className="products-in-order">
                                            <div className="products-in-order-img">
                                              <img src={require('../images/products/' + order.productImage[index])}/>
                                            </div>
                                            <div className="products-in-order-info">
                                                <h5>{order.productName[index]}</h5>
                                                <p>{order.productSize[index]}</p>
                                                <span>x {order.numberOfEachProduct[index]}</span>
                                            </div>
                                            <div className="products-in-order-price">
                                                <h5>USD {order.productPrice[index]}</h5>
                                            </div>
                                        </div>
                                        )
                                      })
                                    }
                                    <div className="orders-summary">
                                      <div className="client-info">
                                        <p>Name: {order.userName}</p>
                                        <p>Phone: {order.userPhone}</p>
                                        <p>Address: {order.userAddress}</p>
                                        <p>delivery time: {order.shippingTime}</p>
                                      </div>
                                      <div className="payment-info">
                                        <div className="orders-detail">
                                          <h5>Total: </h5>
                                          <span>{order.productPriceTotal} USD</span>
                                          <h5>Shipping Fee: </h5>
                                          <span>{order.shippingFee} USD</span>
                                          <h5>Coupon/gift: </h5>
                                          <span></span>
                                          <h5 className="payment-h5">Payment: </h5>
                                          <span className="payment-span">{order.productPriceTotal + order.shippingFee} USD</span>
                                        </div>
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