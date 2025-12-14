const express = require("express");
const cors = require("cors");

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

// Health check (intentional simple endpoint)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;
