// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// const auth = require("../middleware/authMiddleware");
// const notesController = require("../controllers/notesController");

// // 🔥 multer config (FIXED)
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     // 🔥 remove spaces from filename
//     const cleanName = file.originalname.replace(/\s+/g, "_");
//     cb(null, Date.now() + "-" + cleanName);
//   }
// });

// const upload = multer({ storage });

// // ROUTES
// router.post("/upload", auth, upload.single("file"), notesController.uploadNote);
// router.get("/", auth, notesController.getNotes);
// router.delete("/:id", auth, notesController.deleteNote);

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");

const auth = require("../middleware/authMiddleware");
const notesController = require("../controllers/notesController");

// 🔥 Multer config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + cleanName);
  }
});

const upload = multer({ storage });

// ✅ Routes
router.post("/upload", auth, upload.single("file"), notesController.uploadNote);
router.get("/", auth, notesController.getNotes);
router.delete("/delete/:id", auth, notesController.deleteNote);

module.exports = router;