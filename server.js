//* import -> require
require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("mern:server");
const usersRouter = require("./routes/api/users")
const dogBreedsRouter = require("./routes/api/dogBreeds")
const memoriesRouter = require("./routes/api/memories");
const dogProfilesRouter = require("./routes/api/dogProfiles")
const dogTricksRouter = require("./routes/api/dogTricks")

//* app
const app = express();

//* middleware
app.use(logger("dev"));
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
  




