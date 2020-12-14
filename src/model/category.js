const connection = require('../config/mysql')

module.exports = {
  getProductByCategoryModel: (category_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT category.category_id, category.category_name, product.product_id, product.product_name, product.product_price  FROM product JOIN category ON product.category_id = category.category_id WHERE category.category_id = '${category_id}'`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
