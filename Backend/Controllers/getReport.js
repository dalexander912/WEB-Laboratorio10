import { pool } from '../Data/data.js';

//  GET: /api/sales/report
export const getReport = (request, response) => {
  pool.query(
    `SELECT c.name, SUM(s.amount) AS total_sales 
    FROM sales s 
    JOIN customers c ON s.id_customer = c.id 
    GROUP BY c.name`, 
    (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};