const connection = require('../config/mysql')

module.exports = {
  getProductByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM product WHERE product_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteProductByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM product WHERE product_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postProductModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO product SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  patchProductModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE product SET ? WHERE product_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  getProductCountModel: (product_name, category_id) => {
    const blank = ''
    const name =
      product_name !== ''
        ? ` product_name LIKE '%${product_name}%'`
        : ` product_name LIKE '%${blank}%'`
    const cat = category_id !== '' ? ` AND category_id = ${category_id}` : ''
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM product WHERE ${name}${cat}`,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getProductModel: (product_name, category_id, sortBy, limit, offset) => {
    const blank = ''
    const defsort = 'product_created_at DESC'
    const name =
      product_name !== ''
        ? ` product_name LIKE '%${product_name}%'`
        : ` product_name LIKE '%${blank}%'`
    const cat = category_id !== '' ? ` AND category_id = ${category_id}` : ''
    const sort = sortBy !== '' ? ` ORDER BY ${sortBy}` : ` ORDER BY ${defsort}`
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product WHERE ${name}${cat}${sort} LIMIT ${limit} OFFSET ${offset}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
