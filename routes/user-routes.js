const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/user-controller');

// Register a new user
router.post('/register', register);

// Login and get a JWT token
router.post('/login', login);  // Use POST for login

module.exports = router;
