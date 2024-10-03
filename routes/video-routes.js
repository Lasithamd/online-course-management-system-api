const express = require('express')
const router = express.Router()

const {saveVideo, deleteVideo,getSingleVideo, getVideoByCourse,uploadVideo,getVideo} =require('../controller/video-controller')

router.get('/:id', getVideoByCourse)
router.post('/', uploadVideo, saveVideo)
router.delete('/:id', deleteVideo)
router.get('/', getVideo)
router.get('/detail/:id', getSingleVideo)
module.exports = router