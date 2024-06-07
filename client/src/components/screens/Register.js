import React from 'react';

import Background from './Background';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './Register.css';

const Register = () => {
  return (
    <>
      <Background />
      <div className="register-Container">
        <h2>Register</h2>
        <Formik>
          <Form>
            <div className="input-field">
              <label htmlFor="email">Enter your UserName</label>
              <Field
                className="input-field-input"
                type="text"
                name="name"
                id="name"
              />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className="input-field">
              <label htmlFor="email">Enter your Email</label>
              <Field
                className="input-field-input"
                type="email"
                name="email"
                id="email"
              />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="input-field">
              <label htmlFor="password">Enter your Password</label>
              <Field
                className="input-field-input"
                type="password"
                name="password"
                id="password"
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit">SignUp</button>
            <div className="login">
              <p>
                Have an account? <a href="/">Login</a>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Register;
