import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

class Header extends React.Component{
    state = {
        quantity: this.props.quantity
    }
    componentDidUpdate(nextProps){
        if(this.props.quantity != nextProps.quantity)
            this.setState({ quantity: nextProps.quantity });
    }
    render(){
        console.log(" state ", this.state.quantity, "props ", this.props.quantity);
        return(
            <div className="header">
                <h1><Link to="/">Shopping Cart</Link></h1>
                <div className="header-cart">
                    <Link to="/your-cart">Cart: {this.state.quantity}</Link>
                </div>
            </div>
        )
    }
}

export default Header;