const router = require('express').Router()
const {
  getCoupon,
  getCouponById,
  deleteCouponById,
  postCoupon,
  patchCoupon
} = require('../controller/coupon')

router.get('/', getCoupon)
router.get('/:id', getCouponById)
router.delete('/:id', deleteCouponById)
router.post('/', postCoupon)
router.patch('/:id', patchCoupon)

module.exports = router
