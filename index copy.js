const express = require('express')
const app = express()
const mysql = require('mysql2')
var bodyParser = require('body-parser')
const port = 3000
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'course_manage'
})

connection.connect()
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/students', (req, res) => {
  const sql='SELECT * from students'
  connection.query(sql, (err, rows, fields) => {
    if (err) throw err
    res.send(rows)
  })
  
})

app.post('/students', (req, res) => {
  const re= req.body
  const sql = 'insert into students (name,phone,email,app_password)values (?,?,?,?)'
  connection.query(sql,[re.name,re.phone,re.email,re.app_password], (err, rows, fields) => {
    if (err) throw err
    res.send('Student added successfull...!')
  })
})

app.put('/students/:id', (req, res) => {
  const re= req.body
  const sql = 'insert into students (name,phone,email,app_password)values (?,?,?,?)'
  connection.query(sql,[re.name,re.phone,re.email,re.app_password], (err, rows, fields) => {
    if (err) throw err
    res.send('Student added success...!')
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})