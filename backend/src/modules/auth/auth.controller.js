const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../../shared/db");

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, role",
      [email, hash]
    );

    const token = jwt.sign(
      { userId: result.rows[0].id, role: result.rows[0].role },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "1h" }
    );

    return res.status(201).json({ token });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "User already exists" });
    }
    return res.status(500).json({ message: "Registration failed" });
  }
};

module.exports = { register };
