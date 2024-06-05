const express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader && authorizationHeader.split(' ')[1];

  try {
    if (!token) {
      throw new Error('Access token is missing');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message);
  }
};

module.exports = { isLoggedIn };
