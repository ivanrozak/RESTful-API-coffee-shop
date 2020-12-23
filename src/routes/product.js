const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const {
  getProduct,
  getProductById,
  deleteProductById,
  postProduct,
  patchProduct
} = require('../controller/product')

router.get('/', authorization, getProduct) // http://localhost:3000/product
router.get('/:id', authorization, getProductById) // http://localhost:3000/product/1
router.delete('/:id', authorization, deleteProductById)
router.post('/', authorization, postProduct)
router.patch('/:id', authorization, patchProduct)

module.exports = router
