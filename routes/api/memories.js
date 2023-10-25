const express = require("express");
const router = express.Router();
const memoriesCtrl = require("../../controllers/api/memories");
const { checkToken } = require("../../config/checkToken");

router.get("/", checkToken, memoriesCtrl.getMemories)
router.post("/", checkToken, memoriesCtrl.addMemory)
router.delete("/:memoryId", checkToken, memoriesCtrl.deleteMemory)
router.patch("/:memoryId", checkToken, memoriesCtrl.updateMemory)
router.post("/:memoryId/comments", checkToken, memoriesCtrl.addComment)
router.get("/:memoryId/comments", memoriesCtrl.getComments)


module.exports = router;