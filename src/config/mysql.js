const mysql = require('mysql')
require('dotenv').config()
const connection = mysql.createConnection({
  route: process.env.route,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  timezone: 'UTC'
})

connection.connect((error) => {
  if (error) {
    throw error
  }
  console.log('You are now conected ...')
})

module.exports = connection
