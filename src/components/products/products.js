import React from 'react';
import Product from './product/product';
import './products.css';

class Products extends React.Component{
    // addToCart = product  => {
    //     let { cart } = this.props;
    //     cart.push(product);
    //     this.props.callbackCart(cart);
    // }

    render(){
        let { products } = this.props;

        return(
            <div className="products">
            {products.length > 0 ?
                <React.Fragment>
                    {products.map(product => <Product key={product.id} product={product} callbackCart={this.props.callbackCart} /> )}
                </React.Fragment> 
                : <div>Loading...</div>
            }
            </div>
        )
    }
}

export default Products;