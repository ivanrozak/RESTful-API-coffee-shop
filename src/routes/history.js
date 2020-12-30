const router = require('express').Router()
const { authorization, isAdmin } = require('../middleware/auth')
const {
  getHistory,
  getHistoryById,
  deleteHistoryById,
  postHistory,
  patchHistory,
  getHistoryYearly,
  getHistoryWeekly,
  getHistoryDaily,
  getHistoryByUserId
} = require('../controller/history')

router.get('/', authorization, isAdmin, getHistory)
router.get('/:id', authorization, getHistoryById)
router.delete('/:id', authorization, isAdmin, deleteHistoryById)
router.post('/', authorization, postHistory)
router.patch('/:id', authorization, isAdmin, patchHistory)
router.get('/total/year', authorization, isAdmin, getHistoryYearly)
router.get('/total/week', authorization, isAdmin, getHistoryWeekly)
router.get('/total/day', authorization, isAdmin, getHistoryDaily)
router.get('/user/:user_id', authorization, isAdmin, getHistoryByUserId)

module.exports = router
