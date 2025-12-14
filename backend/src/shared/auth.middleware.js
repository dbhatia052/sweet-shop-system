const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Missing token" });

  const token = header.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { requireAuth };
