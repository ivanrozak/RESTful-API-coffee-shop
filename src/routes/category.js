const router = require('express').Router()
const { getProductByCategory } = require('../controller/category')

router.get('/:category_id', getProductByCategory)

module.exports = router
