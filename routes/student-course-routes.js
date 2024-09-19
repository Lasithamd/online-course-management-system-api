const express = require('express')
const router = express.Router()

const {saveStudentCourse, deleteStudentCourse} =require('../controller/student-course-controller')

router.post('/', saveStudentCourse)
router.delete('/:id', deleteStudentCourse)

module.exports = router