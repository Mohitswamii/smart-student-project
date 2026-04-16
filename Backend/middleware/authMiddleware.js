const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) return res.send("Access denied ❌");

  // 🔥 Bearer remove karo
  const token = header.split(" ")[1];

  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next();
  } catch {
    res.send("Invalid token ❌");
  }
};