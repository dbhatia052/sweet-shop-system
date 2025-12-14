const express = require("express");
const router = express.Router();
const { list, add, purchase } = require("./sweets.controller");
const { requireAuth } = require("../../shared/auth.middleware");

router.get("/", requireAuth, list);
router.post("/", requireAuth, add);
router.post("/:id/purchase", requireAuth, purchase);

module.exports = router;
