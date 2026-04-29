const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.get("/", (req, res) => {
  res.send(`
    <h2>File Metadata Microservice</h2>
    <form action="/api/fileanalyse" method="post" 
enctype="multipart/form-data">
      <input type="file" name="upfile">
      <input type="submit" value="Upload">
    </form>
  `);
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
