const connection  =require('../db/db-connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const getStudent =(req,res)=>{
    connection.query('SELECT * FROM students', (err, rows,fields) => {
        if(err) throw err
        res.json(rows);
      });     
}
const getSingleStudent =(req,res)=>{
   const sql= 'SELECT * FROM students where id=?;'
  connection.query(sql,[[req.params.id]], (err, rows,fields) => {
      if(err) throw err
      res.json(rows);
    });     
}
const saveStudent =(req,res)=>{
    const re = req.body;
    bcrypt.hash(re.app_password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
        const sql = 'INSERT INTO students (name,phone,email,app_password) VALUES (?, ?, ?,?)';
      connection.query(sql, [re.name,re.phone,re.email,hashedPassword], (err, rows,fields) => {
        if (err) {
          console.error('Error registering Student:', err);
          return res.status(500).json({ error: 'Failed to register Student' });
        }
        console.log('Student registered successfully');
        res.status(201).json({ 
          message: 'Student registered successfully' 
        
        });
      });
    });

  
}

const updateStudent =(req,res)=>{
    const re = req.body
    const sql= 'update students set name= ? where id=?;'
    connection.query(sql,[re.name,re.age,req.params.id],(err,rows,fields) => {
      if(err) throw err
      console.log('Student  updated');
      res.json(rows);
    })
}

const deleteStudent =(req,res)=>{
    const sql= 'DELETE FROM students WHERE id=?;'
    connection.query(sql,[req.params.id],(err,rows,fields) => {
      if(err) throw err
      console.log('Stundent deleted');
      res.json(rows);
    })
}

const login = (req, res) => {
  const { email, app_password } = req.body;

  if (!email || !app_password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM students WHERE email = ?';
  connection.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const student = results[0];

    bcrypt.compare(app_password, student.app_password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (isMatch) {
        const userResponse = {
          id: student.id,
          name: student.name,
          email: student.email,
        };

        // Generate a token for the user
        const token = jwt.sign({ id: student.id }, JWT_SECRET, { expiresIn: '5h' });

        console.log('User logged in successfully');
        // Respond with the user object and token
        res.json({ user: userResponse, token });
      } else {
        return res.status(401).json({ error: 'Incorrect password' });
      }
    });
  });
};
module.exports = { getStudent, saveStudent, updateStudent, deleteStudent,getSingleStudent,login}