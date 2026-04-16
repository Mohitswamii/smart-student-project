const db = require("../config/db");

// GET USERS
const getUsers = (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, result) => {
    if (err) return res.send("Error ❌");
    res.json(result);
  });
};

// DELETE NOTE
const deleteNote = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM notes WHERE id=?", [id], (err) => {
    if (err) return res.send("Error ❌");
    res.send("Note deleted 🗑️");
  });
};

// DELETE DOUBT
const deleteDoubt = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM doubts WHERE id=?", [id], (err) => {
    if (err) return res.send("Error ❌");
    res.send("Doubt deleted 🗑️");
  });
};

// ✅ EXPORT IMPORTANT
module.exports = { getUsers, deleteNote, deleteDoubt };