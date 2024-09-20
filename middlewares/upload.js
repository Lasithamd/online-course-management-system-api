const multer = require('multer');
const path = require('path');

// Set up storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'thumbnails') {
          cb(null, 'uploads/thumbnails'); // Thumbnails folder
        } else if (file.fieldname === 'video') {
          cb(null, 'uploads/videos'); // Videos folder
        } else {
          cb(new Error('Invalid field name'), false);
        }
      },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
