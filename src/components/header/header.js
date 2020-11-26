import React, { useEffect, useState, useCallback } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/modal';
import { connect } from 'react-redux';
import { validate } from '../../utils/utils';

function Header(props){
    let [modalType, setModalType] = useState("");
    let [userData, setUserData] = useState(null);

    const close = useCallback(() => { 
        setModalType(""); 
        document.body.style.overflow = "auto";
    }, []);    

    const user = useCallback((data) => {
        console.log(" data ", data);
        setUserData(data);
    }, []);

    const logout = () => {
        if(validate(userData.firebaseRef)){            
            userData.firebaseRef.auth().signOut().then(function() {
                // Sign-out successful.
                console.log(" logout done ");
                setUserData(null);
            }).catch(function(error) {
                // An error happened.
                console.log(" error in logout ", error);
            });
        }
    }

    return(
        <React.Fragment>
            <div className="header">
                <h1><Link to="/">Shopping Cart</Link></h1>
                <div className="paddingTop-30">
                    <Link to="/your-cart" className="header-btn cart-link">Cart: {props.quantity}</Link>
                </div>
                {userData === null ? <div className="paddingTop-30">
                    <button className="header-btn" onClick={() => setModalType("login")}>Login</button>
                    <button className="header-btn" onClick={() => setModalType("signup")}>Signup</button>
                </div>:
                <div className="paddingTop-30 logout">
                    <div className="displayName">Hi {userData.displayName}</div>
                    <button className="header-btn" onClick={logout}>Logout</button>
                </div>
                }
            </div>
            {modalType != "" && <Modal modalType={modalType} callbackClose={close} callbackUser={user} />}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    let updatedQuantity = 0;
    if((state.cart.cart) != undefined && (state.cart.cart).length > 0){
        (state.cart.cart).forEach(product => {
            if(product.count != undefined) updatedQuantity += product.count;
        })
    }    
    return {
        quantity: updatedQuantity
    }
}

export default connect(mapStateToProps)(Header);