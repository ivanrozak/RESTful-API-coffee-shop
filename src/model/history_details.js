const connection = require('../config/mysql')

module.exports = {
  getHistoryDetailsModel: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM detail_history LIMIT ? OFFSET ?',
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
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
  deleteHistoryDetailsByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM detail_history WHERE detail_history_id = ?',
        id,
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
  },
  patchHistoryDetailsModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE detail_history SET ? WHERE detail_history_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              detail_history_id: id,
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
  getHistoryDetailsCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM detail_history',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  }
}
