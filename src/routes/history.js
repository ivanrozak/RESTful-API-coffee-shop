const router = require('express').Router()
const { authorization } = require('../middleware/auth')
const {
  getHistory,
  getHistoryById,
  deleteHistoryById,
  postHistory,
  patchHistory
} = require('../controller/history')

router.get('/', authorization, getHistory)
router.get('/:id', authorization, getHistoryById)
router.delete('/:id', authorization, deleteHistoryById)
router.post('/', authorization, postHistory)
router.patch('/:id', authorization, patchHistory)

module.exports = router
