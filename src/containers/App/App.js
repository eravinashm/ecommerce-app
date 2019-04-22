import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import SimpletNavbar from '../SimpleNavbar/SimpleNavbar';
import ProductsPage from '../ProductsPage/ProductsPage';
import ProductPage from '../EachProductPage/ProductPage';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SimpletNavbar />
        <Route path='/' exact component={ProductsPage} />
        <Route path='/product' component={ProductPage} />
      </React.Fragment>
    );
  }
}

export default App;
