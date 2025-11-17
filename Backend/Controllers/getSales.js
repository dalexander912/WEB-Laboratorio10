import { pool } from '../Data/data.js';

//  GET: /api/sales
export const getSales = (request, response) => {
  pool.query(
    `SELECT s.id, s.amount, s.created_at, c.name 
    FROM sales s 
    JOIN customers c ON s.id_customer = c.id`, 
    (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};