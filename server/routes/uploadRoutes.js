const express = require("express");
const multer = require("multer");
const router = express.Router();

// Set up multer for file handling
const upload = multer({
  dest: 'uploads/', // This is where files will be stored. Make sure this folder exists.
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
});

router.post("/", upload.single('file'), (req, res) => {
  // req.file is the 'file' object
  // req.body will hold the text fields, if there were any
  console.log(req.file);
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  console.log(`File uploaded: ${req.file.originalname}`);
  console.log(`File size: ${req.file.size} bytes`);

  res.status(200).json({ message: "File uploaded successfully" });
});

module.exports = router;