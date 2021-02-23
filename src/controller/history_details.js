const {
  getHistoryDetailsByIdModel,
  getHistoryDetailsByInvoiceModel,
  deleteHistoryDetailsByInvoiceModel,
  postHistoryDetailsModel
} = require('../model/history_details')
const helper = require('../helper/response')

module.exports = {
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
  deleteHistoryDetailsByInvoice: async (request, response) => {
    try {
      const { invoice } = request.params
      const checkinvoice = await getHistoryDetailsByInvoiceModel(invoice)

      if (checkinvoice.length > 0) {
        const result = await deleteHistoryDetailsByInvoiceModel(invoice)
        return helper.response(
          response,
          200,
          'Success Delete History Details By invoice',
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
  postHistoryDetails: async (request, response) => {
    try {
      const historyDetail = request.body
      let result
      for (let i = 0; i < historyDetail.length; i++) {
        const {
          product_id,
          product_name,
          product_image,
          invoice,
          detail_qty,
          detail_total,
          detail_size,
          detail_delivery
        } = historyDetail[i]
        const setData = {
          product_id,
          product_name,
          product_image,
          invoice,
          detail_qty,
          detail_total,
          detail_size,
          detail_delivery,
          created_at: new Date()
        }
        console.log(setData)
        result = await postHistoryDetailsModel(setData)
      }
      return helper.response(
        response,
        200,
        'Success Post History Details',
        result
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
