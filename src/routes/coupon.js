const router = require('express').Router()
const { authorization, isAdmin } = require('../middleware/auth')
const {
  getCoupon,
  getCouponById,
  deleteCouponById,
  postCoupon,
  patchCoupon
} = require('../controller/coupon')

router.get('/', authorization, getCoupon)
router.get('/:id', authorization, getCouponById)
router.delete('/:id', authorization, isAdmin, deleteCouponById)
router.post('/', authorization, isAdmin, postCoupon)
router.patch('/:id', authorization, isAdmin, patchCoupon)

module.exports = router
