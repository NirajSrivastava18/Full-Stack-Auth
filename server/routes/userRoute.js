const express = require('express');
const { register, login } = require('../controller/authController');
const {
  registerValidation,
  loginValidation,
} = require('../middleware/validators');

const router = express.Router();

router.post('/signup', registerValidation, register);

router.post('/login', loginValidation, login);

module.exports = router;
