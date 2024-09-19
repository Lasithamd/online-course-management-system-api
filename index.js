const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const studentRouter =require('./routes/student-routes')
const courseRouter =require('./routes/course-routes')
const stuCourseRoutesRouter =require('./routes/student-course-routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/student', studentRouter)
app.use('/course', courseRouter)
app.use('/student-course', stuCourseRoutesRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})