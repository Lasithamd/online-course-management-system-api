const connection  =require('../db/db-connection');


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
    const sql = 'INSERT INTO students (name,phone,email,app_password) VALUES (?, ?, ?,?)';
    connection.query(sql, [re.name,re.phone,re.email,re.app_password], (err, rows,fields) => {
        if(err) throw err
        console.log('Student saved');
        res.json(rows);
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