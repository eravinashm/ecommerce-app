import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Products from './components/products/products';
import Header from './components/header/header';
import Cart from './components/Cart/Cart';

export default function App(){
    let [cart, setCart] = useState([]);
    const callback = cart => {
        console.log(" cart ");
        setCart(cart);
    }
    return(
        <Router>
            <Header quantity={cart.length} />
            <Switch>
                <Route exact path="/"><Products callback={callback} /></Route>
                <Route exact path="/your-cart"><Cart cart={cart} /></Route>
                <Route render={() => <div>Page Not Found</div>} />
            </Switch>
        </Router>
    )
}

