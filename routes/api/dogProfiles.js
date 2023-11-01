const express = require("express");
const router = express.Router();
const dogProfilesCtrl = require("../../controllers/api/dogProfiles");
const { checkToken } = require("../../config/checkToken");

// POST /api/users
router.post("/", checkToken, dogProfilesCtrl.addDogProfile);
router.get("/all", dogProfilesCtrl.getAllDogProfiles)
router.get("/", checkToken, dogProfilesCtrl.getDogProfile);
router.patch("/:dogProfileId", checkToken, dogProfilesCtrl.updateDogProfile)


module.exports = router;