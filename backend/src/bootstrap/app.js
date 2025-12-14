require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("../modules/auth/auth.routes");
const sweetsRoutes = require("../modules/sweets/sweets.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

module.exports = app;
