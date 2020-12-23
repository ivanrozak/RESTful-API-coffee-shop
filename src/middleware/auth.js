const jwt = require('jsonwebtoken')
const helper = require('../helper/response')

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization
    // console.log(token)
    // proses 1 cek apakah header dimasukkan?
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(response, 400, error.message)
        } else {
          // proses pengecekan role
          console.log(result)
          request.token = result
          next()
        }
      })
    } else {
      return helper.response(response, 400, 'Please Login First !')
    }
  }
}
