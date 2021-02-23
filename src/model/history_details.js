const connection = require('../config/mysql')

module.exports = {
  getHistoryDetailsByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM detail_history WHERE detail_history_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryDetailsByInvoiceModel: (invoice) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM detail_history WHERE invoice = ?',
        invoice,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteHistoryDetailsByInvoiceModel: (invoice) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM detail_history WHERE invoice = ?',
        invoice,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postHistoryDetailsModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO detail_history SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              detail_history_id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
