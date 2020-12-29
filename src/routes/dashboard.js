const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const { getDashboard } = require('../controller/dashboard')

router.get('/', authorization, getDashboard)

module.exports = router
