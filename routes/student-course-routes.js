const express = require('express')
const router = express.Router()

const {saveStudentCourse, deleteStudentCourse,getStudentCourse,getNotActiveCourse} =require('../controller/student-course-controller')

router.post('/', saveStudentCourse)
router.delete('/:id', deleteStudentCourse)
router.get('/:id', getStudentCourse)
router.get('/course/:id', getNotActiveCourse)

module.exports = router