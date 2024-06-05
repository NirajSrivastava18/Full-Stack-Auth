const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Register Route
const register = async (req, res) => {
  // Destructure the request body
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate a salt for password hashing
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new user
    const newUser = new User({
      username, // Username
      email, // Email
      password: hashedPassword, // Hashed password
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' }); // Return a success message
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Login Route
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Password not matched' });

    const token = jwt.sign(user.toJSON(), process.env.JWT, { expireIn: 3600 });

    res.cookie('token', token, { httpOnly: true }).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
