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
          request.decodeToken = result
          next() // untuk lanjut ke proses middleware berikutnya
        }
      })
    } else {
      return helper.response(response, 400, 'Please Login First !')
    }
  },
  isAdmin: (request, response, next) => {
    console.log('middle  ware is admin')
    console.log(request.decodeToken) // akan ada property user role
    // check kondisi apakah rolenya bisa akses atau tidak
    if (request.decodeToken.user_role < 1) {
      return helper.response(response, 400, 'Access Denied!')
    } else {
      next()
    }
  }
}
