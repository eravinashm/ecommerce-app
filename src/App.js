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
    // console.log(" props ", props);
    let [cart, setCart] = useState([]);
    let [quantity, setQuantity] = useState(0);
    let [products, setProducts] = useState([]);

    function callbackCart(cart){
        setCart(cart);
        setQuantity(cart.length);
    }

    async function makeAPICall(){
        let responseData = await fetchService('products');
        console.log(" responseData ", responseData);
        if(responseData.length > 0){        
            setProducts(responseData);
            // props.storeProducts(responseData);
        }    
    }

    useEffect(() => {
        if(products.length === 0) makeAPICall();
        if(cart.length > 0) setQuantity(cart.length);
        else setQuantity(0);
    }, [cart, products]);
    return(
        <Router>
            <Header quantity={quantity} />
            <Switch>
                <Route exact path="/"><Products callbackCart={callbackCart} products={products} /></Route>
                <Route exact path="/your-cart"><Cart cart={cart} /></Route>
                <Route  path="/checkout"><CardDemo stripePublicKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY} /></Route>
                <Route  path="/view-product"><ViewProduct products={products} /></Route>
                <Route render={() => <div>Page Not Found</div>} />
            </Switch>
        </Router>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        storeProducts: (data) => dispatch({ type: "STORE_PRODUCTS", payload: data})
    }
}

export default connect(null, mapDispatchToProps)(App);