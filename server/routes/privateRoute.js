const express = require('express');
const router = express.Router();
const privatePage = require('../controller/privatePage');
const { isLoggedIn } = require('../middleware/isLoggedIn');

router.get('/private', isLoggedIn, privatePage); // Pass isLoggedIn as a middleware function reference

module.exports = router;
