const mysql = require('mysql2');

let connection;

function getConnection() {
  if (!connection) {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'course_manage'
    });
  }
  return connection;
}

module.exports = getConnection();