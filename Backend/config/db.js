// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",   // agar password hai toh likh
//   database: "smart_hub"
// });

// db.connect((err) => {
//   if (err) {
//     console.log("DB Error ❌", err);
//   } else {
//     console.log("MySQL Connected ✅");
//   }
// });

// module.exports = db;




// // FAKE DB (for deployment)

// console.log("DB Disabled for now 🚫");

// module.exports = {
//   query: (sql, values, callback) => {
//     console.log("Query skipped:", sql);
//     callback(null, []);
//   }
// };





const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("MySQL Pool Connected ✅");

module.exports = db;