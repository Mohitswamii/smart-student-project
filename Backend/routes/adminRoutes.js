const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const adminController = require("../controllers/adminController");

// 👑 ROUTES
router.get("/users", auth, admin, adminController.getUsers);

router.delete("/note/:id", auth, admin, adminController.deleteNote);

router.delete("/doubt/:id", auth, admin, adminController.deleteDoubt);

module.exports = router;