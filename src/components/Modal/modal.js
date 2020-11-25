import React from 'react';
import './modal.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../../firebase/config';
const firebaseApp = firebase.initializeApp(config);

class Modal extends React.Component {
    state = {
        modalType: this.props.modalType        
    }

    componentDidMount(){
        // document.body.style.position = "fixed";
        document.body.scrollTop = 0;
        document.body.style.overflow = "hidden";

        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        // var btn = document.getElementById("login-Btn");

        // Get the <span> element that closes the modal
        // var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        // btn.onclick = function() {
        //     modal.style.display = "block";
        // }

        // When the user clicks on <span> (x), close the modal
        // span.onclick = function() {
        //     modal.style.display = "none";
        //     document.body.style.overflow = "auto";
        // }

        // When the user clicks anywhere outside of the modal, close it
        let thisRef = this;
        window.onclick = function(event) {
            if (event.target == modal) {
                thisRef.props.callback();
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.modalType != prevProps.modalType)
            this.setState({ modalType: this.props.modalType});
    }
    
    clickHandler = type => {
        this.setState({ modalType: type });
    }

    login = values => {
        console.log(" values ", values);
    }
    signup = values => {
        console.log(" values ", values);
        this.props.createUserWithEmailAndPassword(values.email, values.password);
    }

    render(){
        console.log(" this.props ", this.props);
        return(
            <div id="myModal" className="modal">

                <div className="modal-content">
                    <span className="close" onClick={this.props.callback}>&times;</span>
                    <div className="tabs">
                        <div className={this.state.modalType === "login" ? "active": "inactive"} onClick={() => this.clickHandler("login")}>Login</div>
                        <div className={this.state.modalType === "signup" ? "active": "inactive"} onClick={() => this.clickHandler("signup")}>Signup</div>
                    </div>
                    {this.state.modalType === "login" ? <LoginForm login={this.login} />:<SignupForm signup={this.signup} />}   
                </div>
            </div>        
        )
    }
}


const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })(Modal);
