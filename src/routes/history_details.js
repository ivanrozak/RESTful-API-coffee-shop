const router = require('express').Router()
const {
  getHistoryDetails,
  getHistoryDetailsById,
  deleteHistoryDetailsById,
  postHistoryDetails,
  patchHistoryDetails
} = require('../controller/history_details')

router.get('/', getHistoryDetails)
router.get('/:id', getHistoryDetailsById)
router.delete('/:id', deleteHistoryDetailsById)
router.post('/', postHistoryDetails)
router.patch('/:id', patchHistoryDetails)

module.exports = router
