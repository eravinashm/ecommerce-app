import React from 'react';
import './modal.css';
import LoginForm from './LoginForm';

class Modal extends React.Component{
    state = {
        modalType: this.props.modalType        
    }

    componentDidMount(){
        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("login-Btn");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        btn.onclick = function() {
        modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }
    }

        
    clickHandler = type => {
        this.setState({ modalType: type });
    }

    render(){
        return(
            <div id="myModal" className="modal">

                <div className="modal-content">
                    <span className="close">&times;</span>
                    <div className="tabs">
                        <div className={this.state.modalType === "login" ? "active": "inactive"} onClick={() => this.clickHandler("login")}>Login</div>
                        <div className={this.state.modalType === "signup" ? "active": "inactive"} onClick={() => this.clickHandler("signup")}>Signup</div>
                    </div>
                    {this.state.modalType === "login" ? 
                        <LoginForm />:<div>Signup </div>
                    }   
                </div>
            </div>        
        )
    }
}

export default Modal;