const db = require("../config/db");

// POST COMMENT
const postComment = (req, res) => {
  const { comment, doubt_id } = req.body;

  db.query(
    "INSERT INTO comments (comment, doubt_id, user_id) VALUES (?, ?, ?)",
    [comment, doubt_id, req.user.id],
    (err) => {
      if (err) {
        console.log(err);
        return res.send("Error ❌");
      }
      res.send("Comment added ✅");
    }
  );
};

// GET COMMENTS BY DOUBT
const getComments = (req, res) => {
  const { doubt_id } = req.params;

  db.query(
    "SELECT comments.*, users.name FROM comments JOIN users ON comments.user_id = users.id WHERE doubt_id=?",
    [doubt_id],
    (err, result) => {
      if (err) return res.send("Error ❌");
      res.json(result);
    }
  );
};

module.exports = { postComment, getComments };