// const db = require("../config/db");

// // ================= UPLOAD NOTE =================
// const uploadNote = (req, res) => {
//   const { title } = req.body;

//   if (!req.file) {
//     return res.send("No file uploaded ❌");
//   }

//   const file = req.file.filename;

//   db.query(
//     "INSERT INTO notes (title, file_path, user_id) VALUES (?, ?, ?)",
//     [title, file, req.user.id],
//     (err) => {
//       if (err) {
//         console.log(err);
//         return res.send("Error ❌");
//       }
//       res.send("Note uploaded ✅");
//     }
//   );
// };

// // ================= GET NOTES =================
// const getNotes = (req, res) => {
//   db.query(
//     "SELECT notes.*, users.name FROM notes JOIN users ON notes.user_id = users.id",
//     (err, result) => {
//       if (err) return res.send("Error ❌");
//       res.json(result);
//     }
//   );
// };

// // ================= DELETE NOTE =================
// const deleteNote = (req, res) => {
//   const { id } = req.params;

//   db.query("DELETE FROM notes WHERE id = ?", [id], (err) => {
//     if (err) return res.send("Error ❌");
//     res.send("Note deleted 🗑️");
//   });
// };

// // ================= FINAL EXPORT =================
// module.exports = {
//   uploadNote,
//   getNotes,
//   deleteNote
// };
const db = require("../config/db");

// 📌 Upload Note
// const uploadNote = (req, res) => {
//   try {
//     const file = req.file;
//     const { title } = req.body;

//     if (!file) {
//       return res.status(400).send("No file uploaded ❌");
//     }

//     const fileUrl = req.file.path;

//     const sql = "INSERT INTO notes (title, file) VALUES (?, ?)";

//     db.query(sql, [title, filename], (err, result) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).send("Upload failed ❌");
//       }

//       res.send("Note uploaded successfully ✅");
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error ❌");
//   }
// };
const uploadNote = (req, res) => {
  try {
    const { title } = req.body;

    // 🔥 FILE CHECK
    if (!req.file) {
      return res.status(400).send("No file uploaded ❌");
    }

    // 🔥 CLOUDINARY URL
    const fileUrl = req.file.path;

    // 🔥 DATABASE SAVE
    db.query(
      "INSERT INTO notes (title, file) VALUES (?, ?)",
      [title, fileUrl],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Upload failed ❌");
        }

        res.send("Note uploaded successfully ✅");
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).send("Server error ❌");
  }
};

// 📌 Get Notes
const getNotes = (req, res) => {
  db.query("SELECT * FROM notes", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error ❌");
    }

    res.json(result);
  });
};

// 📌 Delete Note
const deleteNote = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM notes WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Delete failed ❌");
    }

    res.send("Note deleted successfully ✅");
  });
};

module.exports = { uploadNote, getNotes, deleteNote };