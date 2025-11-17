import { pool } from '../Data/data.js';

//  PUT: /users/:id
export const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email, password } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2, password = $4 WHERE id = $3', [name, email, id, password], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
  })
};