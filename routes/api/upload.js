const express = require('express');
const router = express.Router();
const Multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: "images",
    });
    return res;
  }
  
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.post('/', upload.single('my_file'), async (req, res) => {
  try {
    // Handle upload logic
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({ message: error.message });
  }
});

module.exports = router;