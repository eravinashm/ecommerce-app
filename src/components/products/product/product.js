import React from 'react';
import { Link } from 'react-router-dom';

import './product.css';

function Product(props){
    return(
        <div className="product">
            <img src={props.product.img} alt="" />
            <div>{props.product.id}</div>
            <div>{props.product.name}</div>
            <div>{props.product.price}</div>
            <div className="view-add-btns">
                <button className="view-btn product-btn"><Link to={`/view-product?id=${props.product.id}`}>View</Link></button>
                <button className="add-btn product-btn" onClick={() => props.callbackCart(props.product)}>Add To Cart</button>
            </div>
            <button className="buy-btn product-btn">Buy Now</button>
        </div>
    )
}

export default Product;