import jwt from "jsonwebtoken";

import { pool } from "../Data/data.js";
import { JWT_SECRET } from "../Keys/keys.js";
import { generateHash } from "../Middlewares/hash.js";

//  POST: /signUp
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const hashGenerated = await generateHash(password);

  pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashGenerated],
    (error, results) => {
      if (error) { throw error; }

      const user = results.rows[0];
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

      return res.status(201).json({
        status: true,
        message: `User added with ID: ${JSON.stringify(user)}`,
        token: token,
        user: user
      });
    }
  );
};