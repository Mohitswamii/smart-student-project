// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const header = req.headers["authorization"];

//   if (!header) return res.send("Access denied ❌");

//   // 🔥 Bearer remove karo
//   const token = header.split(" ")[1];

//   try {
//     const verified = jwt.verify(token, "secretkey");
//     req.user = verified;
//     next();
//   } catch {
//     res.send("Invalid token ❌");
//   }
// };
// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   const header = req.headers["authorization"];

//   if (!header) return res.send("No token ❌");

//   const token = header.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, "secretkey"); // SAME KEY
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.send("Invalid token ❌");
//   }
// };

// module.exports = auth;
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.send("No token ❌");
    }

    // 🔥 FIX: Bearer hata ke token lena
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.send("Invalid token ❌");
    }

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.send("Invalid token ❌");
  }
};

module.exports = auth;