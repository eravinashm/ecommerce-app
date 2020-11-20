import React from 'react';
import fetchService from '../../fetchService';
import Product from './product/product';
import './products.css';
import { connect } from 'react-redux';

class Products extends React.Component{
    state = {
        products: [],
        cart: []
    }
    async componentDidMount(){
        let products = await fetchService('products')
        if(products.length > 0){
            this.props.storeProducts(products);
            this.setState({ products });
        }
    }
    addToCart = product  => {
        let { cart } = this.state;
        cart.push(product);
        this.props.callbackCart(cart);
        this.setState({ cart });
    }

    render(){
        let { products } = this.state;
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

const mapDispatchToProps = dispatch => {
    return{
        // dispatching plain actions
        storeProducts: (data) => dispatch({ type: "STORE_PRODUCTS", payload: data})
    }
}

export default connect(null, mapDispatchToProps)(Products);