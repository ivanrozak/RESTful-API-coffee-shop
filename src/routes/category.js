const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const { getProductByCategory } = require('../controller/category')

router.get('/:category_id', authorization, getProductByCategory)

module.exports = router
