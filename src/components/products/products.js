import React from 'react';
import Product from './product/product';
import './products.css';

class Products extends React.Component{
    state = {
        cart: []
    }

    addToCart = product  => {
        let { cart } = this.state;
        cart.push(product);
        this.props.callbackCart(cart);
        this.setState({ cart });
    }

    render(){
        let { products } = this.props;
        console.log(" products ", products);
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