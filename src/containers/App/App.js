import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SimpletNavbar from '../SimpleNavbar/SimpleNavbar';
import ProductsPage from '../ProductsPage/ProductsPage';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SimpletNavbar />
        <ProductsPage />
      </React.Fragment>
    );
  }
}

export default App;
