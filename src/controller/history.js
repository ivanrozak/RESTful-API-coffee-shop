const {
  getHistoryModel,
  getHistoryCountModel,
  getHistoryByIdModel,
  deleteHistoryByInvoiceModel,
  postHistoryModel,
  patchHistoryModel,
  getHistoryYearlyModel,
  getHistoryWeeklyModel,
  getHistoryDailyModel,
  getHistoryByUserIdModel,
  getHistoryByInvoiceModel
} = require('../model/history')
const helper = require('../helper/response')
const qs = require('querystring')

module.exports = {
  getHistory: async (request, response) => {
    try {
      let { page, limit } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await getHistoryCountModel()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1
          ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
          : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
          : null
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:3000/history?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/history?${prevLink}`
      }
      const result = await getHistoryModel(limit, offset)
      return helper.response(
        response,
        200,
        'Success Get History',
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getHistoryByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          'Success Get History By Id',
          result
        )
      } else {
        return helper.response(response, 404, `History By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteHistoryByInvoice: async (request, response) => {
    try {
      const { invoice } = request.params
      const checkinvoice = await getHistoryByInvoiceModel(invoice)

      if (checkinvoice.length > 0) {
        const result = await deleteHistoryByInvoiceModel(invoice)
        return helper.response(
          response,
          200,
          'Success Delete History By invoice',
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `History By invoice : ${invoice} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postHistory: async (request, response) => {
    try {
      const {
        invoice,
        payment_method,
        sub_total,
        tax_fees,
        grand_total,
        shipping,
        discount,
        history_status,
        user_id
      } = request.body

      const setData = {
        invoice,
        payment_method,
        sub_total,
        tax_fees,
        grand_total,
        shipping,
        discount,
        history_status,
        user_id,
        created_at: new Date()
      }
      const result = await postHistoryModel(setData)
      return helper.response(response, 200, 'Success Post History', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchHistory: async (request, response) => {
    try {
      const { id } = request.params
      const setData = {
        history_status: 1
      }
      const checkId = await getHistoryByIdModel(id)
      if (checkId.length > 0) {
        const result = await patchHistoryModel(setData, id)
        return helper.response(response, 200, 'Update History Success', result)
      } else {
        return helper.response(response, 404, `History By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryYearly: async (_request, response) => {
    try {
      const result = await getHistoryYearlyModel()
      return helper.response(
        response,
        200,
        'Success get sub_total Yearly',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryWeekly: async (_request, response) => {
    try {
      const result = await getHistoryWeeklyModel()
      return helper.response(
        response,
        200,
        'Success get sub_total Weekly',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryDaily: async (_request, response) => {
    try {
      const dateNow = new Date().toISOString().slice(0, 10)
      const result = await getHistoryDailyModel(dateNow)
      return helper.response(
        response,
        200,
        'Success get sub_total Daily',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryByUserId: async (request, response) => {
    try {
      const { user_id } = request.params
      const result = await getHistoryByUserIdModel(user_id)

      if (result.length > 0) {
        return helper.response(
          response,
          200,
          `Success get user ${user_id} history`,
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `History by user ${user_id} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
