const router = require('express').Router()
const { registerUser, loginUser, updateUser } = require('../controller/user')
const uploadImage = require('../middleware/multerUser')

router.post('/register', registerUser)
router.patch('/:email/update', uploadImage, updateUser)
router.post('/login', loginUser)

module.exports = router
