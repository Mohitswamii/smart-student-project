const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGNUP
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hash],
    (err) => {
      if (err) return res.send("Error ❌");
      res.send("Signup successful ✅");
    }
  );
};

// LOGIN
const login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (result.length === 0) return res.send("User not found ❌");

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.send("Wrong password ❌");

    const token = jwt.sign({ id: user.id }, "secretkey");

    res.json({ token });
  });
};

// 🔥 UPDATE PASSWORD
const updatePassword = async (req, res) => {
  const { newPassword } = req.body;

  const hash = await bcrypt.hash(newPassword, 10);

  db.query(
    "UPDATE users SET password=? WHERE id=?",
    [hash, req.user.id],
    (err) => {
      if (err) return res.send("Error ❌");
      res.send("Password updated ✅");
    }
  );
};

// 🔥 UPDATE EMAIL
const updateEmail = (req, res) => {
  const { newEmail } = req.body;

  db.query(
    "UPDATE users SET email=? WHERE id=?",
    [newEmail, req.user.id],
    (err) => {
      if (err) return res.send("Error ❌");
      res.send("Email updated ✅");
    }
  );
};

// ✅ FINAL EXPORT (MOST IMPORTANT)
module.exports = { signup, login, updatePassword, updateEmail };
// 🔥 CHANGE PASSWORD
const changePassword = (req, res) => {
  const { password } = req.body;

  db.query(
    "UPDATE users SET password=? WHERE id=?",
    [password, req.user.id],
    (err) => {
      if (err) return res.send("Error ❌");
      res.send("Password updated ✅");
    }
  );
};

// 🔥 CHANGE EMAIL
const changeEmail = (req, res) => {
  const { email } = req.body;

  db.query(
    "UPDATE users SET email=? WHERE id=?",
    [email, req.user.id],
    (err) => {
      if (err) return res.send("Error ❌");
      res.send("Email updated ✅");
    }
  );
};