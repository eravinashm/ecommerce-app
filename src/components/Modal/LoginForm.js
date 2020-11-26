import React from 'react';
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};
    
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

const LoginForm = props => {
    const formik = useFormik({
        initialValues: {
            email: 'test16@gmail.com',
            password: 'test16g'
        },
        validateOnBlur: false,
        validateOnChange:false,
        validate,
        onSubmit: values => {
            props.login(values);
        }
    });
    return(
        <form onSubmit={formik.handleSubmit}>
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

export default LoginForm;

/*
  componentDidMount() {
    auth.getAuth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/dashboard');
      }
    });
  }
*/