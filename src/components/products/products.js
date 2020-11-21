import React from 'react';
import Product from './product/product';
import './products.css';

class Products extends React.Component{
    addToCart = product  => {
        console.log(" product ", product);
        let { cart } = this.props;
        cart.push(product);
        this.props.callbackCart(cart);
    }

    render(){
        console.log(" Products.js props ", this.props);
        let { products } = this.props;

        return(
            <div className="products">
            {products.length > 0 ?
                <React.Fragment>
                    {products.map(product => <Product key={product.id} product={product} addToCart={this.addToCart} /> )}
                </React.Fragment> 
                : <div>Loading...</div>
            }
            </div>
        )
    }
}

export default Products;