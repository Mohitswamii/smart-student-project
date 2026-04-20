// const db = require("../config/db");
// const cloudinary = require("../config/cloudinary");
// const fs = require("fs");

// 📌 Upload Note
// const uploadNote = async (req, res) => {
//   try {
//     const { title } = req.body;

//     if (!req.file) {
//       return res.status(400).send("No file uploaded ❌");
//     }

//     // 🔥 upload to cloudinary
//    const result = await cloudinary.uploader.upload(req.file.path, {
//  resource_type: "raw", // 🔥 CHANGE THIS
//   folder: "notes"
// });
//     // 🔥 delete temp file
//     fs.unlinkSync(req.file.path);

//     const fileUrl = result.secure_url;

//     // 🔥 save in DB
//     db.query(
//       "INSERT INTO notes (title, file) VALUES (?, ?)",
//       [title, fileUrl],
//       (err) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).send("Upload failed ❌");
//         }

//         res.send("Note uploaded successfully ✅");
//       }
//     );

//   } catch (error) {
//     console.log("ERROR 👉", error);
//     res.status(500).send("Server error ❌");
//   }
// };
// const uploadNote = (req, res) => {
//   try {
//     const { title } = req.body;

//     if (!req.file) {
//       return res.status(400).send("No file uploaded ❌");
//     }

//     const filePath = req.file.filename;

//     db.query(
//       "INSERT INTO notes (title, file) VALUES (?, ?)",
//       [title, filePath],
//       (err) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).send("Upload failed ❌");
//         }

//         res.send("Note uploaded successfully ✅");
//       }
//     );

//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error ❌");
//   }
// };

// // 📌 Get Notes
// const getNotes = (req, res) => {
//   db.query("SELECT * FROM notes", (err, result) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send("Error ❌");
//     }
//     res.json(result);
//   });
// };

// // 📌 Delete Note
// const deleteNote = (req, res) => {
//   const id = req.params.id;

//   db.query("DELETE FROM notes WHERE id = ?", [id], (err) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send("Delete failed ❌");
//     }
//     res.send("Note deleted ✅");
//   });
// };

// // ✅ EXPORT
// module.exports = {
//   uploadNote,
//   getNotes,
//   deleteNote
// };





const db = require("../config/db");

// 📌 Upload
const uploadNote = (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.send("No file ❌");
    }

    const fileName = req.file.filename;

    db.query(
      "INSERT INTO notes (title, file) VALUES (?, ?)",
      [title, fileName],
      (err) => {
        if (err) return res.send("Error ❌");
        res.send("Uploaded ✅");
      }
    );
  } catch {
    res.send("Server error ❌");
  }
};

// 📌 Get
const getNotes = (req, res) => {
  db.query("SELECT * FROM notes", (err, result) => {
    if (err) return res.send("Error ❌");
    res.json(result);
  });
};

// 📌 Delete
const deleteNote = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM notes WHERE id=?", [id], (err) => {
    if (err) return res.send("Error ❌");
    res.send("Deleted ✅");
  });
};

module.exports = { uploadNote, getNotes, deleteNote };