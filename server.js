const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

// Use memory storage — no files written to disk
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// File analysis endpoint
app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server running on port " + PORT);
});
