const express = require("express");
const router = express.Router();
const dogProfilesCtrl = require("../../controllers/api/dogProfiles");
const { checkToken } = require("../../config/checkToken");

// POST /api/users
router.post("/", checkToken, dogProfilesCtrl.addDogProfile);
router.get("/", dogProfilesCtrl.getAllDogProfiles)



module.exports = router;