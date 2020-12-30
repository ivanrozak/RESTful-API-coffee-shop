const {
  getHistoryModel,
  getHistoryCountModel,
  getHistoryByIdModel,
  deleteHistoryByIdModel,
  postHistoryModel,
  patchHistoryModel,
  getHistoryYearlyModel,
  getHistoryWeeklyModel,
  getHistoryDailyModel
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
          : null // page=...&limit=...
      // console.log(request.query)
      // console.log(qs.stringify(request.query))
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
      // response.status(200).send(result)
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
  deleteHistoryById: async (request, response) => {
    try {
      const { id } = request.params
      const checkId = await getHistoryByIdModel(id)

      if (checkId.length > 0) {
        const result = await deleteHistoryByIdModel(id)
        return helper.response(
          response,
          200,
          'Success Delete History By Id',
          result
        )
      } else {
        return helper.response(response, 404, `History By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postHistory: async (request, response) => {
    try {
      const {
        history_invoice,
        payment_method,
        delivery_method_id,
        history_status,
        user_id
      } = request.body

      const setData = {
        history_invoice,
        payment_method,
        delivery_method_id,
        history_status,
        user_id,
        history_created_at: new Date()
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
      const { sub_total } = request.body
      // disini kondisi validation
      const setData = {
        sub_total
      }
      const checkId = await getHistoryByIdModel(id)
      if (checkId.length > 0) {
        // proses update data
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
  }
}
