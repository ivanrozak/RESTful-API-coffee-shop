const router = require('express').Router()
const uploadImage = require('../middleware/multerProduct')
const { authorization, isAdmin } = require('../middleware/auth')
const {
  getProductByIdRedis,
  getProductRedis,
  clearDataProductRedis
} = require('../middleware/redis')
const {
  getProduct,
  getProductById,
  deleteProductById,
  postProduct,
  patchProduct
} = require('../controller/product')

router.get('/', getProductRedis, getProduct)
router.get('/:id', getProductByIdRedis, getProductById)
router.delete(
  '/:id',
  authorization,
  isAdmin,
  clearDataProductRedis,
  deleteProductById
)
router.post('/', authorization, isAdmin, uploadImage, postProduct)
router.patch(
  '/:id',
  authorization,
  isAdmin,
  clearDataProductRedis,
  uploadImage,
  patchProduct
)

module.exports = router
