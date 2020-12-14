const {
  getHistoryDetailsModel,
  getHistoryDetailsCountModel,
  getHistoryDetailsByIdModel,
  deleteHistoryDetailsByIdModel,
  postHistoryDetailsModel,
  patchHistoryDetailsModel
} = require('../model/history_details')
const helper = require('../helper/response')
const qs = require('querystring')

module.exports = {
  getHistoryDetails: async (request, response) => {
    try {
      let { page, limit } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await getHistoryDetailsCountModel()
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
        nextLink:
          nextLink && `http://localhost:3000/history_details?${nextLink}`,
        prevLink:
          prevLink && `http://localhost:3000/history_details?${prevLink}`
      }
      const result = await getHistoryDetailsModel(limit, offset)
      return helper.response(
        response,
        200,
        'Success Get History Details',
        result,
        pageInfo
      )
      // response.status(200).send(result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryDetailsById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getHistoryDetailsByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          'Success Get History Details By Id',
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `History Details By Id : ${id} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteHistoryDetailsById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await deleteHistoryDetailsByIdModel(id)

      return helper.response(
        response,
        200,
        `Success Delete History Details By Id : ${id}`,
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postHistoryDetails: async (request, response) => {
    try {
      const {
        product_id,
        detail_history_qty,
        detail_size_id,
        detail_history_total,
        history_id
      } = request.body

      const setData = {
        product_id,
        detail_history_qty,
        detail_size_id,
        detail_history_total,
        history_id
      }
      const result = await postHistoryDetailsModel(setData)
      return helper.response(
        response,
        200,
        'Success Post History Details',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchHistoryDetails: async (request, response) => {
    try {
      const { id } = request.params
      const { sub_total } = request.body
      // disini kondisi validation
      const setData = {
        sub_total
      }
      const checkId = await getHistoryDetailsByIdModel(id)
      if (checkId.length > 0) {
        // proses update data
        const result = await patchHistoryDetailsModel(setData, id)
        console.log(result)
      } else {
        return helper.response(
          response,
          404,
          `History Details By Id : ${id} Not Found`
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
