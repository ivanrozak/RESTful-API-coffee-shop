const {
  getProductCountModel,
  getProductByIdModel,
  deleteProductByIdModel,
  postProductModel,
  patchProductModel,
  getProductModel
} = require('../model/product')
const helper = require('../helper/response')
const qs = require('querystring')
const fs = require('fs')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getProduct: async (request, response) => {
    try {
      let { page, limit, product_name, sortBy, category_id } = request.query
      page = parseInt(page)
      limit = parseInt(limit)

      const totalData = await getProductCountModel(product_name, category_id)
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
        nextLink: nextLink && `http://localhost:3000/product?${nextLink}`,
        prevLink: prevLink && `http://localhost:3000/product?${prevLink}`
      }
      const result = await getProductModel(
        product_name,
        category_id,
        sortBy,
        limit,
        offset
      )
      return helper.response(
        response,
        200,
        'Success Get Product',
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getProductByIdModel(id)
      if (result.length > 0) {
        client.setex(`getproductbyid:${id}`, 3600, JSON.stringify(result))
        return helper.response(
          response,
          200,
          'Success Get Product By Id',
          result
        )
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteProductById: async (request, response) => {
    try {
      const { id } = request.params
      const checkId = await getProductByIdModel(id)

      if (checkId.length > 0) {
        fs.unlink(`./uploads/products/${checkId[0].product_image}`, (err) => {
          if (err) throw err
          console.log('Success delete image product')
        })
        const result = await deleteProductByIdModel(id)
        return helper.response(
          response,
          200,
          'Success Delete Product By Id',
          result
        )
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postProduct: async (request, response) => {
    try {
      const {
        category_id,
        product_name,
        product_desc,
        product_qty,
        product_price,
        product_status,
        time_start,
        time_end,
        product_sizeR,
        product_sizeL,
        product_sizeXL,
        product_size250,
        product_size300,
        product_size500,
        product_deliv_home,
        product_deliv_dine,
        product_deliv_take
      } = request.body
      // disini kondisi validation
      // console.log(request.file)
      const setData = {
        category_id,
        product_name,
        product_desc,
        product_qty,
        product_price,
        product_image: request.file === undefined ? '' : request.file.filename,
        product_created_at: new Date(),
        product_status,
        time_start,
        time_end,
        product_sizeR,
        product_sizeL,
        product_sizeXL,
        product_size250,
        product_size300,
        product_size500,
        product_deliv_home,
        product_deliv_dine,
        product_deliv_take
      }
      console.log(setData)
      const result = await postProductModel(setData)
      return helper.response(response, 200, 'Success Post Product', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params
      const {
        // category_id,
        product_name,
        product_price,
        product_desc,
        product_status,
        product_qty,
        product_sizeR,
        product_sizeL,
        product_sizeXL,
        product_size250,
        product_size300,
        product_size500,
        product_deliv_home,
        product_deliv_dine,
        product_deliv_take
      } = request.body
      // disini kondisi validation

      let newImg
      const checkImg = await getProductByIdModel(id)

      if (request.file === undefined) {
        newImg = checkImg[0].product_image
      } else {
        if (checkImg[0].product_image) {
          fs.unlink(
            `./uploads/products/${checkImg[0].product_image}`,
            (err) => {
              if (err) throw err
              console.log('Success Delete Image')
            }
          )
        }
        newImg = request.file.filename
      }

      const setData = {
        // category_id,
        product_name,
        product_price,
        product_desc,
        product_image: newImg,
        product_updated_at: new Date(),
        product_status,
        product_qty,
        product_sizeR,
        product_sizeL,
        product_sizeXL,
        product_size250,
        product_size300,
        product_size500,
        product_deliv_home,
        product_deliv_dine,
        product_deliv_take
      }
      const checkId = await getProductByIdModel(id)

      if (checkId.length > 0) {
        const result = await patchProductModel(setData, id)
        return helper.response(
          response,
          200,
          'Success Update Product By Id',
          result
        )
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
