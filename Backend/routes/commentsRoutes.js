const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const commentsController = require("../controllers/commentsController");

// POST COMMENT
router.post("/", auth, commentsController.postComment);

// GET COMMENTS BY DOUBT ID
router.get("/:doubt_id", auth, commentsController.getComments);

module.exports = router;