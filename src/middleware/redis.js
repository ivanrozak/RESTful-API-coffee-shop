const redis = require('redis')

const client = redis.createClient()
const helper = require('../helper/response')

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada didalam redis')
        return helper.response(
          response,
          200,
          'Success get Product by ID',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada didalam redis')
        next()
      }
    })
  },

  clearDataProductRedis: (request, response, next) => {
    client.keys('getproduct*', (_error, result) => {
      console.log(result)
      if (result.length > 0) {
        result.forEach((value) => {
          client.del(value) // menghapus semua value di redis
        })
      }
      next()
    })
  },
  getProductRedis: (request, response, next) => {
    client.get(
      `getproduct:${JSON.stringify(request.query)}`,
      (error, result) => {
        if (!error && result != null) {
          const newResult = JSON.parse(result)
          console.log('data in redis')
          return helper.response(
            response,
            200,
            'Success get Product redis',
            newResult.result,
            newResult.pageInfo
          )
        } else {
          console.log('tidak ada dalam redis')
          next()
        }
      }
    )
  }
}
