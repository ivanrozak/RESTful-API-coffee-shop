const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const {
  getCoupon,
  getCouponById,
  deleteCouponById,
  postCoupon,
  patchCoupon
} = require('../controller/coupon')

router.get('/', authorization, getCoupon)
router.get('/:id', authorization, getCouponById)
router.delete('/:id', authorization, deleteCouponById)
router.post('/', authorization, postCoupon)
router.patch('/:id', authorization, patchCoupon)

module.exports = router
