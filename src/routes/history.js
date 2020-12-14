const router = require('express').Router()
const {
  getHistory,
  getHistoryById,
  deleteHistoryById,
  postHistory,
  patchHistory
} = require('../controller/history')

router.get('/', getHistory)
router.get('/:id', getHistoryById)
router.delete('/:id', deleteHistoryById)
router.post('/', postHistory)
router.patch('/:id', patchHistory)

module.exports = router
