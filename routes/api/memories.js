const express = require("express");
const router = express.Router();
const memoriesCtrl = require("../../controllers/api/memories");
const { checkToken } = require("../../config/checkToken");

router.get("/", checkToken, memoriesCtrl.getMemories)
router.get("/:userId", checkToken, memoriesCtrl.getMemoriesByUser)
router.post("/", checkToken, memoriesCtrl.addMemory)
router.delete("/:memoryId", checkToken, memoriesCtrl.deleteMemory)
router.patch("/:memoryId", checkToken, memoriesCtrl.updateMemory)
router.post("/:memoryId/comments", checkToken, memoriesCtrl.addComment)
router.get("/:memoryId/comments", memoriesCtrl.getComments)
router.delete("/:memoryId/comments/:commentId", checkToken, memoriesCtrl.deleteComment)
router.patch("/:memoryId/comments/:commentId", checkToken, memoriesCtrl.updateComment)
router.post("/:memoryId/like", checkToken, memoriesCtrl.likeMemory)
router.get("/:memoryId/like", memoriesCtrl.getLikes)

module.exports = router;