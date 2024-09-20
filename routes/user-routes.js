const express = require('express')
const router = express.Router()

const {register} =require('../controller/user-controller')

router.post('/register', register)
// router.post('/', uploadVideo, saveVideo)
// router.delete('/:id', deleteVideo)

module.exports = router