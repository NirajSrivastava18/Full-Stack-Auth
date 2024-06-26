const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { validationResult } = require('express-validator');

//Register Route
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure the request body
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });

    // If the user does not exist, return an error response
    if (!user) return res.status(400).json({ message: 'User does not exist' });

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return an error response
    if (!isMatch) {
      return res.status(400).json({ message: 'Password not matched' });
    } else {
      // Generate a JSON Web Token with the user data
      const token = jwt.sign({ id: user._id }, process.env.JWT_secret, {
        expiresIn: 3600,
      });

      res.status(200).json({
        message: 'User logged In successfully',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    }
  } catch (err) {
    // If an error occurs, return an error response
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
