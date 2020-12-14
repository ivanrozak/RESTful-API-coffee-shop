const mysql = require('mysql')
require('dotenv').config()
const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: '',
  database: 'db_coffe',
  timezone: 'UTC'
})

connection.connect((error) => {
  if (error) {
    throw error
  }
  console.log('You are now conected ...')
})

module.exports = connection
