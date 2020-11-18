import React from 'react';
import './Cart.css';

class Cart extends React.Component{
    render(){
        let totalAmount = 0;
        if(this.props.cart.length > 0){
            totalAmount = this.props.cart.reduce((p1, p2) => +(p1.price)+(+(p2.price)));
        }
        return(
            <div className="cart">
                <h3 className="cart-heading">Your Cart List</h3>
                {this.props.cart.length > 0 ? <ul className="cart-products">
                    {this.props.cart.map((product, index) => (
                        <li key={"cart-product-"+product.id}>
                            <div className="name">{product.name}</div>
                            <div><img src={product.img} /></div>
                            <div>{product.price}</div>
                        </li>   
                    ))}
                    <li>Total Amount = ${totalAmount}</li>
                </ul>
                :<h4 className="no-products-cart">Please add products in cart</h4>}
            </div>
        )
    }
}

export default Cart;