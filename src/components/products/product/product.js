import React from 'react';
import './product.css';

const Product = props => (
    <div className="product">
        <img src={props.product.img} alt="" />
        <div>{props.product.id}</div>
        <div>{props.product.name}</div>
        <div>{props.product.price}</div>
        <div className="view-add-btns">
            <button className="view-btn product-btn">View</button>
            <button className="add-btn product-btn" onClick={() => props.addToCart(props.product)}>Add To Cart</button>
        </div>
        <button className="buy-btn product-btn">Buy Now</button>
    </div>
)

export default Product;