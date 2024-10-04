const connection  =require('../db/db-connection');



const saveStudentCourse =(req,res)=>{
  const re = req.body;
   
    
    const sql = 'INSERT INTO student_course (student_id, course_id) VALUES (?, ?)';
    connection.query(sql, [re.student_id,re.course_id], (err, rows,fields) => {
        if(err) throw err
        console.log('Student Course saved');
        res.json(rows);
      });    
}

const getStudentCourse = (req, res) => {
  const sql = `
    SELECT student_course.student_id, student_course.course_id, courses.name AS course_name , courses.description
    FROM student_course
    JOIN courses ON student_course.course_id = courses.id
    WHERE student_course.student_id = ?;
  `;

  connection.query(sql, [req.params.id], (err, rows, fields) => {
    if (err) throw err;
    console.log('Student course with course name fetched');
    res.json(rows);
  });
};

const deleteStudentCourse =(req,res)=>{
    const sql= 'DELETE FROM student_course WHERE id=?;'
    connection.query(sql,[req.params.id],(err,rows,fields) => {
      if(err) throw err
      console.log('Student Course deleted');
      res.json(rows);
    })
}

module.exports = { saveStudentCourse,deleteStudentCourse,getStudentCourse}