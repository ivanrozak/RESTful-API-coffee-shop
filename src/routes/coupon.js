const router = require('express').Router()
const uploadImage = require('../middleware/multerCoupon')
const { authorization, isAdmin } = require('../middleware/auth')
const {
  getCoupon,
  getCouponById,
  deleteCouponById,
  postCoupon,
  patchCoupon
} = require('../controller/coupon')

router.get('/', getCoupon)
router.get('/:id', getCouponById)
router.delete('/:id', authorization, isAdmin, deleteCouponById)
router.post('/', authorization, isAdmin, uploadImage, postCoupon)
router.patch('/:id', authorization, isAdmin, uploadImage, patchCoupon)

module.exports = router
