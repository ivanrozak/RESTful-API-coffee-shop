const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
const fs = require('fs')
const {
  registerUserModel,
  checkEmailModel,
  patchUserModel
} = require('../model/user')

module.exports = {
  registerUser: async (request, response) => {
    try {
      const {
        user_contact,
        user_email,
        user_password,
        user_role
      } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      const setData = {
        user_contact,
        user_email,
        user_password: encryptPassword,
        user_role,
        user_created_at: new Date()
      }

      const checkSameEmail = await checkEmailModel(user_email)
      if (checkSameEmail.length > 0) {
        return helper.response(
          response,
          400,
          'Email has been used by another user, try with another email'
        )
      }
      const result = await registerUserModel(setData)
      return helper.response(response, 200, 'Success Post User', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      const checkDataUser = await checkEmailModel(user_email)
      console.log(checkDataUser)
      if (checkDataUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        )
        console.log(checkPassword)
        if (checkPassword) {
          const { user_id, user_name, user_email, user_role } = checkDataUser[0]
          const payload = {
            user_id,
            user_name,
            user_email,
            user_role
          }
          const token = jwt.sign(payload, 'RAHASIA', { expiresIn: '24h' })
          const result = { ...payload, token }
          return helper.response(response, 200, 'Success get token !', result)
        } else {
          return helper.response(response, 400, 'Wrong Password !')
        }
      } else {
        return helper.response(
          response,
          400,
          'Email / Account not registered !'
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  updateUser: async (request, response) => {
    try {
      const { email } = request.params
      const {
        user_name,
        user_firstname,
        user_lastname,
        user_gender,
        user_contact,
        user_address,
        user_birth
      } = request.body

      let newPic
      const user = await checkEmailModel(email)

      if (request.file === undefined) {
        newPic = user[0].user_pic
      } else {
        newPic = request.file.filename
        fs.unlink(`./uploads/users/${user[0].user_image}`, function (err) {
          if (err) throw err
          console.log('File deleted!')
        })
      }

      const setData = {
        user_name: user_name,
        user_firstname: user_firstname,
        user_lastname: user_lastname,
        user_gender: user_gender,
        user_address: user_address,
        user_contact: user_contact,
        user_image: newPic,
        user_birth: user_birth,
        user_updated_at: new Date()
      }

      const result = await patchUserModel(setData, email)

      return helper.response(
        response,
        200,
        'Success Update Your Profile',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getUserByEmail: async (request, response) => {
    try {
      const { email } = request.params
      const result = await checkEmailModel(email)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          'Success Get User By Email',
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `User By Email : ${email} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
