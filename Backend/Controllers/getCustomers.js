import { pool } from '../Data/data.js';

//  GET: /api/customers
export const getCustomers = (request, response) => {
  pool.query('SELECT * FROM customers', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};

//  GET: /api/customers/search?code=XYZ
export const getCustomerByCode = (request, response) => {
  const code = request.params.code;

  pool.query('SELECT * FROM customers WHERE code = $1', [code], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
};