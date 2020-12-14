const router = require('express').Router()
const {
  getProduct,
  getProductById,
  deleteProductById,
  postProduct,
  patchProduct
} = require('../controller/product')

router.get('/', getProduct) // http://localhost:3000/product
router.get('/:id', getProductById) // http://localhost:3000/product/1
router.delete('/:id', deleteProductById)
router.post('/', postProduct)
router.patch('/:id', patchProduct)

module.exports = router
