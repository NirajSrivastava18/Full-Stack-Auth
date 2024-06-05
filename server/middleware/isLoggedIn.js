const express = require('express');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(404).json({ message: 'Invalid access token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id).select('-password');

    if (!user) {
      res.status(404).json({ message: 'Invalid access token' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({ message: 'Invalid access token' });
  }
};

module.exports = { isLoggedIn };
