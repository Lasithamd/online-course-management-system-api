const express = require('express')
const router = express.Router()

const {saveVideo, deleteVideo, getVideoByCourse,uploadVideo} =require('../controller/video-controller')

router.get('/:id', getVideoByCourse)
router.post('/', uploadVideo, saveVideo)
router.delete('/:id', deleteVideo)

module.exports = router