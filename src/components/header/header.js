import React, { useState } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/modal';

function Header(props){
    let [modalType, setModalType] = useState("");
    const close = () => { 
        setModalType(""); 
        document.body.style.overflow = "auto";
    }
    return(
        <React.Fragment>
            <div className="header">
                <h1><Link to="/">Shopping Cart</Link></h1>
                <div className="paddingTop-30">
                    <Link to="/your-cart">Cart: {props.quantity}</Link>
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

export default Header;