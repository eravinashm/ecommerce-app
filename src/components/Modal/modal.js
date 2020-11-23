import React from 'react';
import './modal.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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

    submitLoginData = values => {
        console.log(values);
    }

    render(){
        return(
            <div id="myModal" className="modal">

                <div className="modal-content">
                    <span className="close">&times;</span>
                    <div className="tabs">
                        <div className={this.state.modalType === "login" ? "active": ""} onClick={() => this.clickHandler("login")}>Login</div>
                        <div className={this.state.modalType === "signup" ? "active": ""} onClick={() => this.clickHandler("signup")}>Signup</div>
                    </div>
                    {this.state.modalType === "login" ? 
                    <div>
                        <Formik
                         initialValues={{ email: '', password: '' }}
                         validate={values => {
                            const errors = {};
                            if(!values.email){
                                errors.email = 'Required';
                            }else if(
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ){
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                         }}
                         onSubmit={(values, { setSubmitting }) => {
                             setTimeout(() => {
                                this.submitLoginData(values);
                                 setSubmitting(false);
                             }, 400);
                         }}
                        >
                            {({ 
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting 
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <input 
                                     type="email"
                                     name="email"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.email}
                                    />
                                    {errors.email && touched.emal && errors.email}
                                    <input
                                     type="password"
                                     name="password"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.password}
                                    />
                                    {errors.password && touched.password && errors.password}
                                    <button type="submit" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </form>
                            )}
                        </Formik>    
                    </div>:
                    <div>Signup </div>
                    }   
                </div>
            </div>        
        )
    }
}

export default Modal;