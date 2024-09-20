const bcrypt = require('bcrypt');
const connection  =require('../db/db-connection');
const saltRounds = 10;

const login =(req,res)=>{
    connection.query('SELECT * FROM courses', (err, rows,fields) => {
        if(err) throw err
        res.json(rows);
      });     
}



const register = (req, res) => {
  const {name,email,password} = req.body;

  // Check if required fields are provided
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!email ) {

    return res.status(400).json({ error: 'email is required' });
  }
  if (!password ) {
    return res.status(400).json({ error: 'Password is required' });
  }

  // Hash the password using bcrypt
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Failed to hash password' });
    }

    // SQL query to insert the user into the database with hashed password
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    connection.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ error: 'Failed to register user' });
      }

      console.log('User registration successful!');
      res.json({
        message: 'User registered successfully!',
        userId: result.insertId
      });
    });
  });
};

module.exports = { register, login}