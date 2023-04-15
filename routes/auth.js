const express = require("express");
const { register, login, getMe } = require("../controllers/auth");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, authorize("admin", "customer", "vendor"), getMe);

module.exports = router;
