const express = require("express");
const router = express.Router();
const dogProfilesCtrl = require("../../controllers/api/dogProfiles");
const { checkToken } = require("../../config/checkToken");

// POST /api/users
router.post("/", checkToken, dogProfilesCtrl.addDogProfile);
router.get("/all", dogProfilesCtrl.getAllDogProfiles)
router.get("/", checkToken, dogProfilesCtrl.getDogProfile);


module.exports = router;