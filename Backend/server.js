const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 FRONTEND SERVE (YAHI ADD KARNA THA)
app.use(express.static("../Frontend"));

// 🔥 PDF
app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/notesRoutes"));
app.use("/api/doubts", require("./routes/doubtsRoutes"));
app.use("/api/comments", require("./routes/commentsRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/uploads", express.static("uploads"));

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});


const https = require("https");

app.get("/view-pdf", (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("No URL provided ❌");
  }

  https.get(url, (response) => {
    // 🔥 important headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline"); // 👈 ye open karega browser me

    response.pipe(res); // 🔥 direct stream
  }).on("error", (err) => {
    console.log("PDF ERROR 👉", err);
    res.status(500).send("Error loading PDF");
  });
});