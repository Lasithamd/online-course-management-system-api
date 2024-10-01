const express = require('express')
const app = express()
const port = 3000

const authenticateToken = require('./middlewares/authenticateToken');
var bodyParser = require('body-parser')
const studentRouter =require('./routes/student-routes')
const courseRouter =require('./routes/course-routes')
const stuCourseRouters =require('./routes/student-course-routes')
const videoRouters =require('./routes/video-routes')
const userRouters =require('./routes/user-routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/student',authenticateToken, studentRouter)
app.use('/course', authenticateToken, courseRouter)
app.use('/student-course', authenticateToken,stuCourseRouters)
app.use('/video', authenticateToken,videoRouters)
app.use('/user', userRouters)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})