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




// FAKE DB (for deployment)

console.log("DB Disabled for now 🚫");

module.exports = {
  query: (sql, values, callback) => {
    console.log("Query skipped:", sql);
    callback(null, []);
  }
};