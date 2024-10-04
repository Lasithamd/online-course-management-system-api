const express = require('express')
const router = express.Router()

const {saveStudentCourse, deleteStudentCourse,getStudentCourse} =require('../controller/student-course-controller')

router.post('/', saveStudentCourse)
router.delete('/:id', deleteStudentCourse)
router.get('/:id', getStudentCourse)

module.exports = router