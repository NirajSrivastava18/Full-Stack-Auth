import React from 'react';
import Background from './Background';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

import axios from 'axios';
import './Login.css';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values, { setSubmitting }) => {
    axios
      .post('http://localhost:5000/api/login', values)
      .then((res) => {
        alert(res.data.message);

        const { token } = res.data;
        Cookies.set('token', token, { expires: 1 });
        Cookies.set('username', res.data.user.username, { expires: 1 });
        setSubmitting(false);
      })
      .catch((err) => {
        alert('invalid credentials');
        setSubmitting(false);
      });
  };

  return (
    <>
      <Background />
      <div className="login-Container">
        <h2>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="input-field">
                <Field
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
              <button type="submit" disabled={isSubmitting}>
                Log In
              </button>
              <div className="register">
                <p>
                  Don't have an account? <a href="/register">Register</a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
