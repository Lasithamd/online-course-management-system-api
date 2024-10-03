const express = require('express')
const router = express.Router()

const {saveVideo, deleteVideo, getVideoByCourse,uploadVideo,getVideo} =require('../controller/video-controller')

router.get('/:id', getVideoByCourse)
router.post('/', uploadVideo, saveVideo)
router.delete('/:id', deleteVideo)
router.get('/', getVideo)

module.exports = router