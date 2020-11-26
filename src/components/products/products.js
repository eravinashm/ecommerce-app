import React, { useCallback } from 'react';
import { validate } from '../../utils/utils';
import Product from './product/product';
import './products.css';
import { withRouter } from 'react-router-dom';

function Products(props){
    const callbackBuyNow = useCallback(product => {
        props.callbackCart(product);
        props.history.push("payment-confirm");
    }, []);
 
    return(
        <div className="products">
        {(validate(props.products) && props.products.length > 0) ?
            <React.Fragment>
                {props.products.map(product => <Product key={product.id} product={product} {...props} callbackBuyNow={callbackBuyNow} /> )}
            </React.Fragment> 
            : <div>Loading...</div>
        }
        </div>
    )
}

export default withRouter(Products);