import React from 'react';
import fetchService from '../../fetchService';
import Product from './product/product';
import './products.css';

class Products extends React.Component{
    state = {
        products: [],
        cart: []
    }
    async componentDidMount(){
        let products = await fetchService('products')
        if(products.length > 0)
            this.setState({ products });
    }
    addToCart = product  => {
        let { cart } = this.state;
        cart.push(product);
        this.props.callback(cart);
        this.setState({ cart });
    }

    render(){
        let { products } = this.state;
        return(
            <div className="products">
            {products.length > 0 ?
                <React.Fragment>
                    {products.map(product => <Product product={product} addToCart={this.addToCart} /> )}
                </React.Fragment> 
                : <div>Loading...</div>
            }
            </div>
        )
    }
}

export default Products;