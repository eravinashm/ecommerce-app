import React from 'react';
import './Cart.css';

const Cart = props => {
    let totalAmount = 0;
    if(props.cart.length > 0){
        if(props.cart.length > 1){
            totalAmount = props.cart.reduce((product1, product2) => {
                let priceProduct1 = 0, priceProduct2 = 0;
                if(product1.price != undefined && product1.count != undefined)
                    priceProduct1 = +(product1.price)*product1.count;
                if(product2.price != undefined && product2.count != undefined)
                    priceProduct2 = +(product2.price)*product2.count;

                return priceProduct1+priceProduct2;
                });    
        }else{
            totalAmount = ((props.cart)[0].price)*(props.cart)[0].count;
        }
    }

    return(
        <div className="cart">
            <h3 className="cart-heading">Your Cart List</h3>
            {props.cart.length > 0 ? <ul className="cart-products">
                <li>
                    <div>Name</div><div></div><div>Price</div><div>Count</div>
                </li>
                {props.cart.map((product, index) => (
                    <li key={"cart-product-"+product.id}>
                        <div className="name">{product.name}</div>
                        <div><img src={product.img} /></div>
                        <div>${product.price}</div>
                        <div>{product.count}</div>
                    </li>   
                ))}
                <li>Total Amount = ${totalAmount}</li>
            </ul>
            :<h4 className="no-products-cart">Please add products in cart</h4>}
        </div>
    )
}

export default Cart;