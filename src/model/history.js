const connection = require('../config/mysql')

module.exports = {
  getHistoryModel: (limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM history LIMIT ? OFFSET ?',
        [limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM history WHERE history_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryByInvoiceModel: (invoice) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM history WHERE invoice = ?',
        invoice,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteHistoryByInvoiceModel: (invoice) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM history WHERE invoice = ?',
        invoice,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postHistoryModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO history SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: result.insertId,
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
  patchHistoryModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE history SET ? WHERE history_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              history_id: id,
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
  getHistoryCountModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM history',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryYearlyModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT SUM(sub_total) AS total_by_year FROM history WHERE YEAR(history_created_at) = YEAR(NOW())',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryWeeklyModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(history_id) AS total_by_week FROM history WHERE YEARWEEK(history_created_at) = YEARWEEK(NOW())',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryDailyModel: (dateNow) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(sub_total) AS total_daily FROM history WHERE history_created_at LIKE '%${dateNow}%'`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getHistoryByUserIdModel: (user_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM history WHERE user_id = ${user_id}`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
