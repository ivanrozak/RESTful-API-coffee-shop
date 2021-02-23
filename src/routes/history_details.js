const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const {
  getHistoryDetailsById,
  deleteHistoryDetailsByInvoice,
  postHistoryDetails
} = require('../controller/history_details')

router.get('/:id', authorization, getHistoryDetailsById)
router.delete('/:invoice', authorization, deleteHistoryDetailsByInvoice)
router.post('/', authorization, postHistoryDetails)

module.exports = router
