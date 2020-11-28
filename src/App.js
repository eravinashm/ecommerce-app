import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Products from './components/products/products';
import Header from './components/header/header';
import Cart from './components/Cart/Cart';
import StripeCheckout from './Checkout/Checkout';
import ViewProduct from './components/viewProduct/viewProduct';
import { connect } from 'react-redux';
import fetchService from './fetchService';
import PaymentConfirm from './PaymentConfirm/PaymentConfirm';

require('dotenv').config()

function App(props){
    let [products, setProducts] = useState([]);

    function callbackCart(product){
        let { cart } = props;
        if(cart.length > 0){
            let isDuplicate = false;
            for(let car of cart){
                if(car.id === product.id){
                    isDuplicate = true;
                    car.count = isNaN(car.count) ? 1: car.count + 1;
                } 
            }
            if(!isDuplicate){
                product.count = 1;
                cart.push(product);
            } 
        }else{
            product.count = 1;
            cart.push(product);
        } 
        props.addProductToCart(cart);
    }

    async function makeAPICall(){
        let responseData = await fetchService('products');
        if(responseData.length > 0){        
            setProducts(responseData);
            props.storeProducts(responseData);
        }    
    }

    useEffect(() => {
        if(products.length === 0) makeAPICall();
    }, [products]);

    return(
        <Router>
            <Header />
            <Switch>
                <Route exact path="/"><Products products={products} callbackCart={callbackCart} cart={props.cart} /></Route>
                <Route exact path="/your-cart"><Cart cart={props.cart} /></Route>
                <Route  path="/checkout"><StripeCheckout /></Route>
                <Route  path="/view-product"><ViewProduct products={products} callbackCart={callbackCart} cart={props.cart} /></Route>
                <Route  path="/payment-confirm"><PaymentConfirm cart={props.cart} /></Route>
                <Route render={() => <div>Page Not Found</div>} />
            </Switch>
        </Router>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        storeProducts: (data) => dispatch({ type: "STORE_PRODUCTS", payload: data}),
        addProductToCart: (data) => dispatch({ type: "ADD_CART", payload: data }) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);