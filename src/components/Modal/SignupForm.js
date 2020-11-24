import React from 'react';
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Required';
    }else if(values.username.length < 5){
        errors.password = 'Must be  greater or equal to 6 characters';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if(!values.password){
        errors.password = 'Required';
    }else if(values.password.length < 6){
        errors.password = 'Must be  greater or equal to 6 characters';
    }
    return errors;
}

const SignupForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnBlur: false,
        validateOnChange:false,
        validate,
        onSubmit: values => {
            console.log(" values" , values);
            alert(JSON.stringify(values, null, 2));
        }
    });
    return(
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
             id="username"
             name="username"
             type="text"
             onChange={formik.handleChange}
             value={formik.values.username}
             className={formik.errors.username ? "error": ""}
            />
            {formik.errors.username && <div>{formik.errors.username}</div>}
            <label htmlFor="email">Email</label>
            <input
             id="email"
             name="email"
             type="text"
             onChange={formik.handleChange}
             value={formik.values.email}
             className={formik.errors.email ? "error": ""}
            />
            {formik.errors.email && <div>{formik.errors.email}</div>}
            <label htmlFor="password">Password</label>
            <input
             id="password"
             name="password"
             type="password"
             onChange={formik.handleChange}
             value={formik.values.password}
             className={formik.errors.password ? "error": ""}
            />
            {formik.errors.password && <div>{formik.errors.password}</div>}
            <button type="submit">Submit</button>
        </form>
    )
}

export default SignupForm;
