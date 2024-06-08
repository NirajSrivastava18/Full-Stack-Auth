import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Background from './Background';

const PrivatePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState('');

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      };

      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/private',
          config
        );
        setPrivateData(data.data);
      } catch (error) {
        Cookies.remove('token');
        setError('You are not authorized please login');
      }
    };

    fetchPrivateDate();
  }, []);
  const logoutHandler = () => {
    Cookies.remove('token');
    navigate('/');
  };
  return error ? (
    <>
      <Background />
      <span className="error-private-message">{error}</span>
    </>
  ) : (
    <>
      <Background />
      <div className="private-page">
        <h2>Welcome to wanderOn private page Let's Travel✈️</h2>
        <div>{privateData}</div>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </>
  );
};

export default PrivatePage;
