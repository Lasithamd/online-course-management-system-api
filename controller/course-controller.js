const connection  =require('../db/db-connection');


const getCourse =(req,res)=>{
    connection.query('SELECT * FROM courses', (err, rows,fields) => {
        if(err) throw err
        res.json(rows);
      });     
}
const getSingleCourse =(req,res)=>{
   const sql= 'SELECT * FROM courses where id=?;'
  connection.query(sql,[[req.params.id]], (err, rows,fields) => {
      if(err) throw err
      res.json(rows);
    });     
}
const saveCourse =(req,res)=>{
    const re = req.body;
    const sql = 'INSERT INTO courses (name,description) VALUES (?, ?)';
    connection.query(sql, [re.name,re.description], (err, rows,fields) => {
        if(err) throw err
        console.log('Course saved');
        res.json(rows);
      });    
}

const updateCourse =(req,res)=>{
    const re = req.body
    const sql= 'update courses set name= ? where id=?;'
  
    connection.query(sql,[re.name,req.params.id],(err,rows,fields) => {
      if(err) throw err
      console.log('Course  updated');
      res.json(rows);
    })
}

const deleteCourse =(req,res)=>{
    const sql= 'DELETE FROM courses WHERE id=?;'
    connection.query(sql,[req.params.id],(err,rows,fields) => {
      if(err) throw err
      console.log('Stundent deleted');
      res.json(rows);
    })
}

module.exports = { getCourse, saveCourse, updateCourse, deleteCourse, getSingleCourse}