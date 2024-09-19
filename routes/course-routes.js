const express = require('express')
const router = express.Router()

const {getCourse, saveCourse, updateCourse, deleteCourse,getSingleCourse} =require('../controller/course-controller')

router.get('/', getCourse)
router.get('/:id', getSingleCourse)
router.post('/', saveCourse)
router.put('/:id', updateCourse)
router.delete('/:id', deleteCourse)

module.exports = router