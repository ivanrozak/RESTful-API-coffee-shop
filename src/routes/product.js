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

router.get('/', authorization, getProductRedis, getProduct) // http://localhost:3000/product
router.get('/:id', authorization, getProductByIdRedis, getProductById) // http://localhost:3000/product/1
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
) // diclear data agar tidak ngeupdate data redisnya (tidak tersimpan di db)

module.exports = router
