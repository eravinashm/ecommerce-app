import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from './components/products/products';
import Header from './components/header/header';
import Cart from './components/Cart/Cart';
import CardDemo from './Checkout/PaymentForm2';
import ViewProduct from './components/viewProduct/viewProduct';
import { connect } from 'react-redux';
import fetchService from './fetchService';

require('dotenv').config()

function App(props){
    let [quantity, setQuantity] = useState(0);
    let [products, setProducts] = useState([]);

    function callbackCart(cart){
        props.addProductToCart(cart);
        setQuantity(cart.length);
    }

    async function makeAPICall(){
        let responseData = await fetchService('products');
        // console.log(" responseData ", responseData);
        if(responseData.length > 0){        
            setProducts(responseData);
            props.storeProducts(responseData);
        }    
    }

    useEffect(() => {
        // console.log(" props.cart ", props.cart);
        if(products.length === 0) makeAPICall();
        if(props.cart.length > 0) setQuantity(props.cart.length);
        else setQuantity(0);
    }, [props.cart, products]);

    return(
        <Router>
            <Header quantity={quantity} />
            <Switch>
                <Route exact path="/"><Products products={products} callbackCart={callbackCart} cart={props.cart} /></Route>
                <Route exact path="/your-cart"><Cart cart={props.cart} /></Route>
                <Route  path="/checkout"><CardDemo stripePublicKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY} /></Route>
                <Route  path="/view-product"><ViewProduct products={products} callbackCart={callbackCart} cart={props.cart} /></Route>
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