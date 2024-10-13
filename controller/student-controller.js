const connection  =require('../db/db-connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
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

module.exports = { getStudent, saveStudent, updateStudent, deleteStudent,getSingleStudent}