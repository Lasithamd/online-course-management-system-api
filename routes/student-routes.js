const express = require('express')
const router = express.Router()

const {getStudent, saveStudent, updateStudent, deleteStudent,getSingleStudent} =require('../controller/student-controller')

router.get('/', getStudent)
router.get('/:id', getSingleStudent)
router.post('/', saveStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

module.exports = router