import React from 'react';

import Background from './Background';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Register.css';

const Register = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords not matched'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    axios
      .post('http://localhost:5000/api/signup', values)
      .then((res) => {
        alert(res.data.message);
        const { token } = res.data;
        Cookies.set('token', token, { expires: 1 });
        Cookies.set('username', res.data?.user?.username, { expires: 1 });
        setSubmitting(false);
      })
      .catch((err) => {
        alert('Invalid Credentials');
        setSubmitting(false);
      });
  };
  return (
    <>
      <Background />
      <div className="register-Container">
        <h2>Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="input-field">
                <Field
                  className="input-field-input"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your UserName"
                />
              </div>
              <ErrorMessage name="username">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
              <div className="input-field">
                <Field
                  className="input-field-input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                />
              </div>
              <ErrorMessage name="email">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
              <div className="input-field">
                <Field
                  className="input-field-input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                />
              </div>
              <ErrorMessage name="password">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
              <div className="input-field">
                <Field
                  className="input-field-input"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Enter your ConfirmPassword"
                />
              </div>
              <ErrorMessage name="confirmPassword">
                {(msg) => <div className="error-message">{msg}</div>}
              </ErrorMessage>
              <button type="submit" disabled={isSubmitting}>
                SignUp
              </button>
              <div className="login">
                <p>
                  Have an account? <a href="/">Login</a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
