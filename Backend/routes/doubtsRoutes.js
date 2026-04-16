const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const doubtsController = require("../controllers/doubtsController");

router.post("/", auth, doubtsController.postDoubt);
router.get("/", auth, doubtsController.getDoubts);

// 🔥 DELETE ROUTE
router.delete("/:id", auth, doubtsController.deleteDoubt);

module.exports = router;