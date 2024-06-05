// middleware/validators.js

const { check } = require('express-validator');

// registerValidation middleware function
const registerValidation = [
  // Validate 'username' field
  check('username', 'Username is required') // Error message if username is not provided
    .trim() // Remove leading and trailing whitespace
    .escape(), // Escape special characters

  // Validate 'email' field
  check('email', 'Please include a valid email') // Error message if email is not valid
    .isEmail() // Check if the input is an email
    .normalizeEmail(), // Normalize the email address

  // Validate 'password' field
  check('password', 'Password must be 6 or more characters') // Error message if password is too short
    .isLength({ min: 6 }) // Check if the password length is at least 6 characters
    .trim() // Remove leading and trailing whitespace
    .escape(), // Escape special characters
];

// loginValidation middleware function
const loginValidation = [
  // Validate 'email' field
  check('email', 'Please include a valid email') // Error message if email is not valid
    .isEmail() // Check if the input is an email
    .normalizeEmail(), // Normalize the email address

  // Validate 'password' field
  check('password', 'Password is required') // Error message if password is not provided
    .exists() // Check if the password field exists
    .trim() // Remove leading and trailing whitespace
    .escape(), // Escape special characters
];

module.exports = {
  registerValidation,
  loginValidation,
};
