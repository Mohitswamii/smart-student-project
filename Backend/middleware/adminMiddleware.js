const db = require("../config/db");

module.exports = (req, res, next) => {
  db.query("SELECT role FROM users WHERE id=?", [req.user.id], (err, result) => {
    if (err) return res.send("Error ❌");

    if (!result.length || result[0].role !== "admin") {
      return res.send("Admin only ❌");
    }

    next();
  });
};