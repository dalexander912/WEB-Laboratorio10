import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { pool } from "../Data/data.js";
import { JWT_SECRET } from "../Keys/keys.js";

//  GET: /signIn
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE email = $1", [email],
    async (error, results) => {
      if (error) { throw error; }

      const foundUsers = results.rows;
      if (foundUsers.length < 1)
        return res.status(400).json({ message: "Invalid user find" });

      const user = foundUsers[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "8h" });

      return res.status(200).json({ 
        success: true, 
        message: "User found", 
        token: token, 
        user: user
      });
    }
  );
};