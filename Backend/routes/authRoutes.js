// const router = require("express").Router();

// const { signup, login, updatePassword, updateEmail } = require("../controllers/authController");
// const auth = require("../middleware/authMiddleware");

// router.post("/signup", signup);
// router.post("/login", login);

// router.put("/update-password", auth, updatePassword);
// router.put("/update-email", auth, updateEmail);

// module.exports = router;
const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

// ✅ only working routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;