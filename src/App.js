import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from './components/products/products';
import Header from './components/header/header';
import Cart from './components/Cart/Cart';
import CardDemo from './Checkout/PaymentForm2';
import ViewProduct from './components/viewProduct/viewProduct';

require('dotenv').config()

export default function App(props){
    // console.log(" props ", props);
    let [cart, setCart] = useState([]);
    let [quantity, setQuantity] = useState(0);
    function callbackCart(cart){
        setCart(cart);
        setQuantity(cart.length);
    }

    useEffect(() => {
        if(cart.length > 0) setQuantity(cart.length);
        else setQuantity(0);
    }, [cart]);
    return(
        <Router>
            <Header quantity={quantity} />
            <Switch>
                <Route exact path="/"><Products callbackCart={callbackCart} /></Route>
                <Route exact path="/your-cart"><Cart cart={cart} /></Route>
                <Route  path="/checkout"><CardDemo stripePublicKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY} /></Route>
                <Route  path="/view-product"><ViewProduct /></Route>
                <Route render={() => <div>Page Not Found</div>} />
            </Switch>
        </Router>
    )
}

