
const fs = require('fs');
const path = require('path');

const connection  =require('../db/db-connection');
const upload = require('../middlewares/upload');

const uploadVideo = upload.fields([
  { name: 'thumbnails', maxCount: 1 }, 
  { name: 'video', maxCount: 1 }
]);


const getVideo =(req,res)=>{
  const sql= 'SELECT * FROM video;'
 connection.query(sql,[[req.params.id]], (err, rows,fields) => {
     if(err) throw err
     res.json(rows);
   });     
}
const getVideoByCourse =(req,res)=>{
   const sql= 'SELECT * FROM video where course_id=?;'
  connection.query(sql,[[req.params.id]], (err, rows,fields) => {
      if(err) throw err
      res.json(rows);
    });     
}
const getSingleVideo =(req,res)=>{
  const sql= 'SELECT * FROM video where id=?;'
 connection.query(sql,[[req.params.id]], (err, rows,fields) => {
     if(err) throw err
     res.json(rows);
   });     
}
const saveVideo = (req, res) => {
  // Extract file paths from req.files
  const thumbnailsPath = req.files['thumbnails'] ? `/uploads/thumbnails/${req.files['thumbnails'][0].filename}` : null;
  const videoPath = req.files['video'] ? `/uploads/videos/${req.files['video'][0].filename}` : null;
   if (!thumbnailsPath || !videoPath) {
    return res.status(400).json({ error: 'Missing video or thumbnail file' });
  }
  const re = {
    name: req.body.name,
    description: req.body.description,
    thumbnails_path: thumbnailsPath,
    video_path: videoPath,
    course_id: req.body.course_id
  };
console.log(re);

  const sql = 'INSERT INTO video (name, description, thumbnails_path, video_path, course_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [re.name, re.description, re.thumbnails_path, re.video_path, re.course_id], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save video' });
    }
    console.log('Video saved');
    res.json(rows);
  });
};


const deleteVideo = (req, res) => {
  // Step 1: Get video and thumbnail paths from the database
  const selectSql = 'SELECT thumbnails_path, video_path FROM video WHERE id = ?';
  
  connection.query(selectSql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error fetching video details:', err);
      return res.status(500).json({ error: 'Failed to fetch video details' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const videoData = result[0];
    const thumbnailsPath = videoData.thumbnails_path;
    const videoPath = videoData.video_path;

    // Step 2: Delete the files from the filesystem
    if (thumbnailsPath && fs.existsSync(thumbnailsPath)) {
      fs.unlink(thumbnailsPath, (err) => {
        if (err) console.error(`Error deleting thumbnail file: ${thumbnailsPath}`, err);
        else console.log(`Thumbnail file deleted: ${thumbnailsPath}`);
      });
    }

    if (videoPath && fs.existsSync(videoPath)) {
      fs.unlink(videoPath, (err) => {
        if (err) console.error(`Error deleting video file: ${videoPath}`, err);
        else console.log(`Video file deleted: ${videoPath}`);
      });
    }

    // Step 3: Delete the video record from the database
    const deleteSql = 'DELETE FROM video WHERE id = ?';
    connection.query(deleteSql, [req.params.id], (err, rows) => {
      if (err) {
        console.error('Error deleting video from database:', err);
        return res.status(500).json({ error: 'Failed to delete video from database' });
      }

      console.log('Video entry deleted from database');
      res.json({ message: 'Video and associated files deleted successfully', rows });
    });
  });
};

module.exports = { saveVideo, deleteVideo, getVideoByCourse,uploadVideo,getVideo,getSingleVideo}