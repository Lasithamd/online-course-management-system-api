const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const studentRouter =require('./routes/student-routes')
const courseRouter =require('./routes/course-routes')
const stuCourseRouters =require('./routes/student-course-routes')
const videoRouters =require('./routes/video-routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/student', studentRouter)
app.use('/course', courseRouter)
app.use('/student-course', stuCourseRouters)
app.use('/video', videoRouters)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})