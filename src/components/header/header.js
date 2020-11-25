import React, { useEffect, useState, useCallback } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/modal';
import { connect } from 'react-redux';

function Header(props){
    console.log('top header props.cart ', props.cart);
    let [modalType, setModalType] = useState("");
    let [quantity, setQuantity] = useState(props.cart.length);

    const close = useCallback(() => { 
        setModalType(""); 
        document.body.style.overflow = "auto";
    }, []);

    useEffect(() => {
        console.log(" header useEffect props ", props.cart)
        if(props.cart.length > 0) setQuantity(props.cart.length);
        else setQuantity(0);
    }, [props.cart]);

    return(
        <React.Fragment>
            <div className="header">
                <h1><Link to="/">Shopping Cart</Link></h1>
                <div className="paddingTop-30">
                    <Link to="/your-cart">Cart: {quantity}</Link>
                </div>
                <div className="paddingTop-30">
                    <button className="header-btn" id="login-Btn" onClick={() => setModalType("login")}>Login</button>
                    <button className="header-btn" onClick={() => setModalType("signup")}>Signup</button>
                </div>
            </div>
            {modalType != "" && <Modal modalType={modalType} callback={close} />}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps)(Header);