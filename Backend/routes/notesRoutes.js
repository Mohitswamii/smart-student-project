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
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const auth = require("../middleware/authMiddleware");
// const notesController = require("../controllers/notesController");

// 🔥 Multer config
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     const cleanName = file.originalname.replace(/\s+/g, "_");
//     cb(null, Date.now() + "-" + cleanName);
//   }
// });
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "notes",      // cloud me folder banega
//     resource_type: "auto" // PDF allow karega
//   }
// });

// const upload = multer({ storage });

// // ✅ Routes
// router.post("/upload", auth, upload.single("file"), notesController.uploadNote);
// router.get("/", auth, notesController.getNotes);
// router.delete("/delete/:id", auth, notesController.deleteNote);

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const auth = require("../middleware/authMiddleware");
// const notesController = require("../controllers/notesController");

// // 🔥 Cloudinary storage (PDF support)
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: "notes",
//       resource_type: "raw", // ✅ important for PDF
//       public_id: Date.now() + "-" + file.originalname
//     };
//   }
// });

// const upload = multer({ storage });

// // ✅ ROUTES (same as tera)
// router.post("/upload", auth, upload.single("file"), notesController.uploadNote);
// router.get("/", auth, notesController.getNotes);
// router.delete("/delete/:id", auth, notesController.deleteNote);

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const multer = require("multer");

// const auth = require("../middleware/authMiddleware");
// const notesController = require("../controllers/notesController");


// // 🔥 SIMPLE MULTER (local temp storage)
// const upload = multer({ dest: "uploads/" });

// // ✅ ROUTES
// router.post("/upload", auth, upload.single("file"), notesController.uploadNote);
// router.get("/", auth, notesController.getNotes);
// router.delete("/delete/:id", auth, notesController.deleteNote);

// module.exports = router;



const express = require("express");
const router = express.Router();
const multer = require("multer");

const auth = require("../middleware/authMiddleware");
const notesController = require("../controllers/notesController");

// 🔥 LOCAL STORAGE
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + cleanName);
  }
});

const upload = multer({ storage });

// ROUTES
router.post("/upload", auth, upload.single("file"), notesController.uploadNote);
router.get("/", auth, notesController.getNotes);
router.delete("/delete/:id", auth, notesController.deleteNote);

module.exports = router;