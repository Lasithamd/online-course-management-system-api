const connection  =require('../db/db-connection');

const getVideoByCourse =(req,res)=>{
   const sql= 'SELECT * FROM video where course_id=?;'
  connection.query(sql,[[req.params.id]], (err, rows,fields) => {
      if(err) throw err
      res.json(rows);
    });     
}
const saveVideo =(req,res)=>{
    const re = req.body;
    const sql = 'INSERT INTO video (name,description,thumbnails_path,video_path,course_id) VALUES (?, ?, ?,?,?)';
    connection.query(sql, [re.name,re.description,re.thumbnails_path,re.video_path,re.course_id], (err, rows,fields) => {
        if(err) throw err
        console.log('Video saved');
        res.json(rows);
      });    
}

const deleteVideo =(req,res)=>{
    const sql= 'DELETE FROM video WHERE id=?;'
    connection.query(sql,[req.params.id],(err,rows,fields) => {
      if(err) throw err
      console.log('Video deleted');
      res.json(rows);
    })
}

module.exports = { saveVideo, deleteVideo, getVideoByCourse}