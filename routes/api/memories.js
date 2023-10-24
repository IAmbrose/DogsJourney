const express = require("express");
const router = express.Router();
const memoriesCtrl = require("../../controllers/api/memories");
const { checkToken } = require("../../config/checkToken");

router.get("/", checkToken, memoriesCtrl.getMemories)
router.post("/", checkToken, memoriesCtrl.addMemory)
router.delete("/:memoryId", checkToken, memoriesCtrl.deleteMemory)

module.exports = router;