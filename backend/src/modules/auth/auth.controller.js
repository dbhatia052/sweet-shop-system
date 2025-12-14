const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../../shared/db");
const { validateEmailPassword } = require("../../shared/validators");

const register = async (req, res) => {
  const error = validateEmailPassword(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const { email, password } = req.body;
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

const login = async (req, res) => {
  const error = validateEmailPassword(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }

  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT id, password_hash, role FROM users WHERE email = $1",
    [email]
  );

  if (result.rowCount === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "1h" }
  );

  res.json({ token });
};

module.exports = { register, login };
