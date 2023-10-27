const express = require("express");
const router = express.Router();
const dogTricksCtrl = require("../../controllers/api/dogTricks");
const { checkToken } = require("../../config/checkToken");

// POST /api/users
router.post("/", checkToken, dogTricksCtrl.addDogTrick);



module.exports = router;