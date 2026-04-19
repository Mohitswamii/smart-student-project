// const uploadNote = (req, res) => {
//   try {
//     console.log("BODY 👉", req.body);
//     console.log("FILE 👉", JSON.stringify(req.file, null, 2));

//     const { title } = req.body;

//     // 🔥 FILE CHECK
//     if (!req.file) {
//       return res.status(400).send("No file uploaded ❌");
//     }

//     // 🔥 CLOUDINARY URL
//     const fileUrl = req.file.path;

//     // 🔥 DATABASE SAVE
//     db.query(
//       "INSERT INTO notes (title, file) VALUES (?, ?)",
//       [title, fileUrl],
//       (err, result) => {
//         if (err) {
//           console.log("DB ERROR 👉", err);
//           return res.status(500).send("Upload failed ❌");
//         }

//         res.send("Note uploaded successfully ✅");
//       }
//     );

//   } catch (error) {
//     console.log("SERVER ERROR 👉", error);
//     res.status(500).send("Server error ❌");
//   }
// };
const cloudinary = require("../config/cloudinary");

const uploadNote = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).send("No file uploaded ❌");
    }

    // 🔥 upload to cloudinary manually
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "notes"
    });

    const fileUrl = result.secure_url;

    db.query(
      "INSERT INTO notes (title, file) VALUES (?, ?)",
      [title, fileUrl],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Upload failed ❌");
        }

        res.send("Note uploaded successfully ✅");
      }
    );

  } catch (error) {
    console.log(error);
    res.status(500).send("Server error ❌");
  }
};