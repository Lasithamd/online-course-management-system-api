const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db/db-connection');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const register = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ error: 'Failed to register user' });
      }
      console.log('User registered successfully');
      res.status(201).json({ 
        message: 'User registered successfully' 
      
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  connection.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (isMatch) {
        const userResponse = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        // Generate a token for the user
        const token = `${user.id}|${jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' })}`;

        console.log('User logged in successfully');
        // Respond with the user object and token
        res.json({ user: userResponse, token });
      } else {
        return res.status(401).json({ error: 'Incorrect password' });
      }
    });
  });
};

module.exports = { register, login };
