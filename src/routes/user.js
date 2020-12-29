const router = require('express').Router()
const { registerUser, loginUser, updateUser } = require('../controller/user')

router.post('/register', registerUser)
router.patch('/:id/update', updateUser)
router.post('/login', loginUser)

module.exports = router
