const { getProductByCategoryModel } = require('../model/category')
const helper = require('../helper/response')

module.exports = {
  getProductByCategory: async (request, response) => {
    try {
      const { category_id } = request.params
      const result = await getProductByCategoryModel(category_id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          `Success get product by category : ${category_id}`,
          result
        )
      } else {
        return helper.response(
          response,
          404,
          `Category Id : ${category_id} Not Found`,
          result
        )
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
