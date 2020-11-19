import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from './components/products/products';
import Header from './components/header/header';
import Cart from './components/Cart/Cart';

export default function App(){
    let [cart, setCart] = useState([]);
    let [quantity, setQuantity] = useState(0);
    function callback(cart){
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
                <Route exact path="/"><Products callback={callback} /></Route>
                <Route exact path="/your-cart"><Cart cart={cart} /></Route>
                <Route render={() => <div>Page Not Found</div>} />
            </Switch>
        </Router>
    )
}

