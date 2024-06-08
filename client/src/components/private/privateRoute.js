import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = () => {
    const token = Cookies.get('token');
    return token ? true : false;
  };

  return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
