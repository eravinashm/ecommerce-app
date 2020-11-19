import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = props => (
    <div className="header">
        <h1><Link to="/">Shopping Cart</Link></h1>
        <div className="header-cart">
            <Link to="/your-cart">Cart: {props.quantity}</Link>
        </div>
    </div>
);

export default Header;