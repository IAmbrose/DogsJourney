//* import -> require
require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("mern:server");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
const usersRouter = require("./routes/api/users")
const dogBreedsRouter = require("./routes/api/dogBreeds")
const memoriesRouter = require("./routes/api/memories");
const dogProfilesRouter = require("./routes/api/dogProfiles")
const dogTricksRouter = require("./routes/api/dogTricks")


// cloudinary config
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

//* app
const app = express();

//* middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use("/api/users", usersRouter);
app.use("/api/dogBreeds", dogBreedsRouter);
app.use("/api/memories", memoriesRouter);
app.use("/api/dogProfiles", dogProfilesRouter);
app.use("/api/dogTricks", dogTricksRouter);




//* routes
app.get("/api", (req, res) => {
    res.json({ msg: "Hello World!" });
  });

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  //* listen
  const port = process.env.PORT || 3000;
  
  app.listen(port, function () {
    debug(`Express app running on port ${port}`);
  });
  

// Cloudinary
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});


app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});



