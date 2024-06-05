const express = require('express');
const privatePage = (req, res) => {
  res.status(200).json({
    status: 'Success',
    message: 'You got access to the private data in this route',
  });
};

module.exports = privatePage;
