const {
  getCouponModel,
  getCouponCountModel,
  getCouponByIdModel,
  deleteCouponByIdModel,
  postCouponModel,
  patchCouponModel
} = require('../model/coupon')
const helper = require('../helper/response')
const qs = require('querystring')
const fs = require('fs')

module.exports = {
  getCoupon: async (request, response) => {
    try {
      let { page, limit } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await getCouponCountModel()
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
        nextLink: nextLink && `${process.env.URL_BE}coupon?${nextLink}`,
        prevLink: prevLink && `${process.env.URL_BE}coupon?${prevLink}`
      }
      const result = await getCouponModel(limit, offset)
      return helper.response(
        response,
        200,
        'Success Get Coupon',
        result,
        pageInfo
      )
      // response.status(200).send(result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCouponById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getCouponByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          'Success Get Coupon By Id',
          result
        )
      } else {
        return helper.response(response, 404, `Coupon By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteCouponById: async (request, response) => {
    try {
      const { id } = request.params
      const checkId = await getCouponByIdModel(id)

      if (checkId.length > 0) {
        fs.unlink(`./uploads/coupons/${checkId[0].coupon_image}`, (err) => {
          if (err) throw err
          console.log('Success delete image coupon')
        })
        const result = await deleteCouponByIdModel(id)
        return helper.response(
          response,
          200,
          'Success Delete Coupon By Id',
          result
        )
      } else {
        return helper.response(response, 404, `Coupon By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postCoupon: async (request, response) => {
    try {
      const {
        coupon_code,
        coupon_discount,
        coupon_min_purchase,
        coupon_max_limit,
        coupon_start,
        coupon_end
      } = request.body

      const setData = {
        coupon_code,
        coupon_discount,
        coupon_image: request.file === undefined ? '' : request.file.filename,
        coupon_min_purchase,
        coupon_max_limit,
        coupon_start,
        coupon_end,
        coupon_created_at: new Date()
      }
      const result = await postCouponModel(setData)
      return helper.response(response, 200, 'Success Post Coupon', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchCoupon: async (request, response) => {
    try {
      const { id } = request.params
      const {
        coupon_code,
        coupon_discount,
        coupon_min_purchase,
        coupon_max_limit,
        coupon_start,
        coupon_end
      } = request.body

      let newImg
      const checkImg = await getCouponByIdModel(id)

      if (request.file === undefined) {
        newImg = checkImg[0].coupon_image
      } else {
        newImg = request.file.filename
        fs.unlink(`./uploads/coupons/${checkImg[0].coupon_image}`, (err) => {
          if (err) throw err
          console.log('Success Delete Image')
        })
      }

      const setData = {
        coupon_code,
        coupon_discount,
        coupon_image: newImg,
        coupon_min_purchase,
        coupon_max_limit,
        coupon_start,
        coupon_end,
        coupon_updated_at: new Date()
      }
      const checkId = await getCouponByIdModel(id)
      if (checkId.length > 0) {
        // proses update data
        const result = await patchCouponModel(setData, id)
        return helper.response(
          response,
          200,
          'Success Update Coupon By Id',
          result
        )
      } else {
        return helper.response(response, 404, `Coupon By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
