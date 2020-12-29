const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/response')
const {
  registerUserModel,
  checkEmailModel,
  patchUserModel
} = require('../model/user')

module.exports = {
  registerUser: async (request, response) => {
    // console.log(request.body)

    try {
      const { user_name, user_email, user_password, user_role } = request.body
      const salt = bcrypt.genSaltSync(10)
      //   mengacak nilai sebanyak
      const encryptPassword = bcrypt.hashSync(user_password, salt)
      // console.log('before Encrypt = ' + user_password)
      // console.log('after Encrypt = ' + encryptPassword)
      const setData = {
        user_name,
        user_email,
        user_password: encryptPassword,
        user_role,
        user_created_at: new Date()
      }
      const result = await registerUserModel(setData)
      return helper.response(response, 200, 'Success Post User', result)
      // kondisi cek email apakah sudah didatabase?
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { user_email, user_password } = request.body
      //   kondisi 1 pengecekan apakah email ada di database
      const checkDataUser = await checkEmailModel(user_email)
      console.log(checkDataUser)
      if (checkDataUser.length > 0) {
        // proses 2 pengecekan apakah password yang dimasukkan sesuai atau tidak?
        const checkPassword = bcrypt.compareSync(
          user_password,
          checkDataUser[0].user_password
        )
        console.log(checkPassword)
        if (checkPassword) {
          // proses 3 kita akan set JWT supaya menghasilkan token
          const { user_id, user_name, user_email, user_role } = checkDataUser[0]
          const payload = {
            user_id,
            user_name,
            user_email,
            user_role
            // user role &status masuk
          }
          const token = jwt.sign(payload, 'RAHASIA', { expiresIn: '24h' })
          // console.log(token)
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
        user_displayname,
        user_firstname,
        user_lastname,
        user_gender,
        user_password,
        user_contact,
        user_birth
      } = request.body

      const setData = {
        user_name,
        user_displayname,
        user_firstname,
        user_lastname,
        user_gender,
        user_password,
        user_contact,
        user_image: request.file === undefined ? '' : request.file.filename,
        user_birth
      }
      const checkEmail = await checkEmailModel(email)
      if (checkEmail.length > 0) {
        const result = await patchUserModel(setData, email)
        return helper.response(
          response,
          200,
          'Success Update Your Profile',
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `User by Email: ${email} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
