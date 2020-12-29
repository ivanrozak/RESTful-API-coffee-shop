const connection = require('../config/mysql')

module.exports = {
  getDashboardModel: (history) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT SUM(order_subtotal) AS total_price FROM history WHERE YEAR(history_created_at)= YEAR(NOW())GROUP BY YEAR(history_created_at) '${history}'`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
