const express = require('express')
const router = express.Router()

const {saveStudentCourse, deleteStudentCourse,getStudentCourse} =require('../controller/student-course-controller')

router.post('/', saveStudentCourse)
router.get('/:id', getStudentCourse)
router.delete('/:id', deleteStudentCourse)

module.exports = router