const express = require('express')
const router = express.Router()

const {saveVideo, deleteVideo, getVideoByCourse} =require('../controller/video-controller')

router.get('/:id', getVideoByCourse)
router.post('/', saveVideo)
router.delete('/:id', deleteVideo)

module.exports = router