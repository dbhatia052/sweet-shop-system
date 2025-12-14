const { pool } = require("../../shared/db");

const list = async (req, res) => {
  const result = await pool.query("SELECT * FROM sweets");
  res.json(result.rows);
};

const add = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  await pool.query(
    "INSERT INTO sweets (name, category, price, quantity) VALUES ($1, $2, $3, $4)",
    [name, category, price, quantity]
  );

  res.status(201).json({ message: "Sweet added" });
};

const purchase = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const check = await client.query(
      "SELECT quantity FROM sweets WHERE id = $1 FOR UPDATE",
      [req.params.id]
    );

    if (check.rowCount === 0 || check.rows[0].quantity <= 0) {
      throw new Error("Out of stock");
    }

    await client.query(
      "UPDATE sweets SET quantity = quantity - 1 WHERE id = $1",
      [req.params.id]
    );

    await client.query("COMMIT");
    res.json({ message: "Purchase successful" });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(400).json({ message: err.message });
  } finally {
    client.release();
  }
};

module.exports = { list, add, purchase };
