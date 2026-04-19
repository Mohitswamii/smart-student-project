const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dpqclref3",   // ✅ tera cloud name
  api_key: "356889124365217",   // 🔥 paste kar
  api_secret: "iYjzNsdOKl9mf13fD2X3JMfUpoY"  // 🔥 paste kar
});

module.exports = cloudinary;