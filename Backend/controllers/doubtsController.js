const db = require("../config/db");

// POST DOUBT
const postDoubt = (req, res) => {
  const { question } = req.body;

  db.query(
    "INSERT INTO doubts (question, user_id) VALUES (?, ?)",
    [question, req.user.id],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Error ❌");
      }
      res.send("Doubt posted ✅");
    }
  );
};

// GET DOUBTS
const getDoubts = (req, res) => {
  db.query(
    "SELECT doubts.*, users.name FROM doubts JOIN users ON doubts.user_id = users.id",
    (err, result) => {
      if (err) return res.send("Error ❌");
      res.json(result);
    }
  );
};

// DELETE DOUBT
const deleteDoubt = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM doubts WHERE id=?", [id], (err) => {
    if (err) {
      console.log(err);
      return res.send("Error ❌");
    }
    res.send("Doubt deleted 🗑️");
  });
};

// ✅ FINAL EXPORT (ONLY ONCE)
module.exports = { postDoubt, getDoubts, deleteDoubt };