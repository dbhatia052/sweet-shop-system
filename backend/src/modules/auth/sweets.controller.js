const { pool } = require("../../shared/db");

const list = async (req, res) => {
  const result = await pool.query("SELECT * FROM sweets");
  res.json(result.rows);
};

const add = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  await pool.query(
    "INSERT INTO sweets (name, category, price, quantity) VALUES ($1,$2,$3,$4)",
    [name, category, price, quantity]
  );
  res.status(201).json({ message: "Sweet added" });
};

const purchase = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "UPDATE sweets SET quantity = quantity - 1 WHERE id = $1 AND quantity > 0 RETURNING *",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  res.json(result.rows[0]);
};

module.exports = { list, add, purchase };
