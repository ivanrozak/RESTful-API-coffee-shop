const router = require('express').Router()
const product = require('./routes/product')
const category = require('./routes/category')
const coupon = require('./routes/coupon')
const history = require('./routes/history')
const history_details = require('./routes/history_details')
const user = require('./routes/user')
const dashboard = require('./routes/dashboard')

router.use('/product', product)
router.use('/category', category)
router.use('/coupon', coupon)
router.use('/history', history)
router.use('/history_details', history_details)
router.use('/user', user)
router.use('/dashboard', dashboard)

module.exports = router
