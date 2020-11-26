import React from 'react';
import './PaymentConfirm.css';
import { validate } from '../utils/utils';
import { Link } from 'react-router-dom';

function PaymentConfirm(props){ 
    let totalAmount = 0;
    if(validate(props.cart) && props.cart.length > 0){
        props.cart.forEach(product => {
            totalAmount += +(product.price);
        })
    }
    return(
        <div className="center-div">
            <div className="payment-confirm">
                <div>Total Amount: ${totalAmount}</div>
                <Link to="/checkout" className="product-btn">Checkout</Link>
            </div>
        </div>
    )
}        

export default PaymentConfirm;