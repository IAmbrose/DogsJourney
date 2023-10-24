const express = require("express");
const router = express.Router();
const memoriesCtrl = require("../../controllers/api/memories");
const { checkToken } = require("../../config/checkToken");

// router.get("/", memoriesCtrl.getMemories)
router.post("/", checkToken, memoriesCtrl.addMemory)

module.exports = router;