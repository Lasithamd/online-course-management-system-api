const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors({
  origin: 'http://localhost:5173', // Allow your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const authenticateToken = require('./middlewares/authenticateToken');



const studentRouter =require('./routes/student-routes')
const courseRouter =require('./routes/course-routes')
const stuCourseRouters =require('./routes/student-course-routes')
const videoRouters =require('./routes/video-routes')
const userRouters =require('./routes/user-routes')



app.use('/student',authenticateToken, studentRouter)
app.use('/course', authenticateToken, courseRouter)
app.use('/student-course', authenticateToken,stuCourseRouters)
app.use('/video', authenticateToken,videoRouters)
app.use('/user', userRouters)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})