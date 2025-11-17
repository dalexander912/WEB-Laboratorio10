import { pool } from '../Data/data.js';

//  POST: /users
export const createUser = (request, response) => {
  const { name, email, password } = request.body;

  pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
  })
};