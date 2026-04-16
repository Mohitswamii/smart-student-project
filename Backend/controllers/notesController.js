const db = require("../config/db");

// ================= UPLOAD NOTE =================
const uploadNote = (req, res) => {
  const { title } = req.body;

  if (!req.file) {
    return res.send("No file uploaded ❌");
  }

  const file = req.file.filename;

  db.query(
    "INSERT INTO notes (title, file_path, user_id) VALUES (?, ?, ?)",
    [title, file, req.user.id],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Error ❌");
      }
      res.send("Note uploaded ✅");
    }
  );
};

// ================= GET NOTES =================
const getNotes = (req, res) => {
  db.query(
    "SELECT notes.*, users.name FROM notes JOIN users ON notes.user_id = users.id",
    (err, result) => {
      if (err) return res.send("Error ❌");
      res.json(result);
    }
  );
};

// ================= DELETE NOTE =================
const deleteNote = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM notes WHERE id = ?", [id], (err) => {
    if (err) return res.send("Error ❌");
    res.send("Note deleted 🗑️");
  });
};

// ================= FINAL EXPORT =================
module.exports = {
  uploadNote,
  getNotes,
  deleteNote
};