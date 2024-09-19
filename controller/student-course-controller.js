const connection  =require('../db/db-connection');



const saveStudentCourse =(req,res)=>{
    const re = req.body;
    const sql = 'INSERT INTO student_course (student_id,course_id) VALUES (?, ?)';
    connection.query(sql, [re.student_id,re.course_id], (err, rows,fields) => {
        if(err) throw err
        console.log('Student Course saved');
        res.json(rows);
      });    
}



const deleteStudentCourse =(req,res)=>{
    const sql= 'DELETE FROM student_course WHERE id=?;'
    connection.query(sql,[req.params.id],(err,rows,fields) => {
      if(err) throw err
      console.log('Student Course deleted');
      res.json(rows);
    })
}

module.exports = { getStudent, saveStudent, updateStudent, deleteStudent,getSingleStudent}