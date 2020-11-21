import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productReducer from './redux/reducers/productReducer';
import cartReducer from './redux/reducers/cartReducer';

const rootReducers = combineReducers({
    product: productReducer,
    cart: cartReducer
});

const store = createStore(rootReducers);

const Render = (<Provider store={store}><App /></Provider>);

ReactDOM.render(Render, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
