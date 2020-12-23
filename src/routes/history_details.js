const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const {
  getHistoryDetails,
  getHistoryDetailsById,
  deleteHistoryDetailsById,
  postHistoryDetails,
  patchHistoryDetails
} = require('../controller/history_details')

router.get('/', authorization, getHistoryDetails)
router.get('/:id', authorization, getHistoryDetailsById)
router.delete('/:id', authorization, deleteHistoryDetailsById)
router.post('/', authorization, postHistoryDetails)
router.patch('/:id', authorization, patchHistoryDetails)

module.exports = router
