const Memory = require("../../models/memory")

const getMemories = async (req, res) => {
    const user = res.locals.user;
  
    try {
      const memories = await Memory.find({ user: user });
      if (!memories) {
        return res.status(404).json({ message: 'Memories not found.' });
      }
      res.status(200).json(memories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const addMemory = async (req, res) => {
    const memoryData = req.body; 
    const user = res.locals.user; 
  
    try {
      const newMemory = await Memory.create({ ...memoryData, user: user });
      res.status(201).json(newMemory);
    } catch (error) {
      res.status(500).json({ error });
    }
}

const deleteMemory = async (req, res) => {
    const user = res.locals.user;
    const memoryId = req.params.memoryId;
  
    try{
      const memoryToDelete = await Memory.findOneAndDelete({
        _id: memoryId,
        user: user._id,
      });
      if (!memoryToDelete) {
        return res.status(404).json({ message: 'Memory not found in your memories.' });
      }
  
      res.status(200).json({ message: 'Memory removed from your memories.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateMemory = async (req, res) => {
    const user = res.locals.user;
    const memoryId = req.params.memoryId;
    const updateData = req.body

    try{
      const memoryToUpdate = await Memory.findOne({
        _id: memoryId,
        user: user._id,
      })
      if (!memoryToUpdate) {
        return res.status(404).json({ message: 'Memory not found in your memories.' });
      }
      memoryToUpdate.text = updateData.text;
      memoryToUpdate.image = updateData.image;

      await memoryToUpdate.save();
      res.status(200).json({ message: 'Memory updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const addComment = async (req, res) => {
    const user = res.locals.user;
    const memoryId = req.params.memoryId; 
    const commentData = req.body; 
  
    try {
      const memory = await Memory.findById(memoryId);
  
      if (!memory) {
        return res.status(404).json({ message: 'Memory not found.' });
      }
      
      commentData.user = user

      memory.comments.push(commentData);
      await memory.save();
  
      res.status(201).json({ message: 'Comment added successfully.'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getComments = async (req, res) => {
    const memoryId = req.params.memoryId; 
  
    try {
      const memory = await Memory.findById(memoryId);
  
      if (!memory) {
        return res.status(404).json({ message: 'Memory not found.' });
      }
  
      const comments = memory.comments;
  
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteComment = async (req, res) => {
    const memoryId = req.params.memoryId;
    const commentId = req.params.commentId;
    const user = res.locals.user; 
  
    try {
      const memory = await Memory.findById(memoryId).populate("comments.user");
  
      if (!memory) {
        return res.status(404).json({ error: "Attraction not found" });
      }
  
      const comment = memory.comments.find((comment) => comment._id.equals(commentId));
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      if (!comment.user.equals(user._id)) {
        return res.status(403).json({ error: "Unauthorized. You can only delete your own comments." });
      }
  
      const index = memory.comments.indexOf(comment);
      memory.comments.splice(index, 1);
  
      // Save the updated attraction
      await memory.save();
  
      return res.status(200).json({ success: "Comment deleted successfully!" });
    } catch (error) {
      return res.status(500).json({
        error: "Something went wrong when deleting the comment",
      });
    }
  };
  
  const updateComment = async (req, res) => {
    const memoryId = req.params.memoryId;
    const commentId = req.params.commentId;
    const user = res.locals.user;
  
    try {
      const memory = await Memory.findById(memoryId).populate("comments.user");
  
      if (!memory) {
        return res.status(404).json({ error: "Memory not found" });
      }
  
      const comment = memory.comments.find((comment) => comment._id.equals(commentId));
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      if (!comment.user._id.equals(user._id)) {
        return res.status(403).json({ error: "Unauthorized. You can only update your own comments." });
      }
  
      comment.text = req.body.text;
  
      await memory.save();
  
      return res.status(200).json({ text: comment.text });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        error: "Something went wrong when updating the comment",
      });
    }
  };
  
  const likeMemory = async (req, res) => {
    const memoryId = req.params.memoryId;
    const user = res.locals.user;
  
    try {
      const memory = await Memory.findById(memoryId);
  
      if (!memory) {
        return res.status(404).json({ error: "Memory not found" });
      }

      const existingLike = memory.likes.find((like) => like.user.equals(user._id));
  
      if (existingLike) {
        memory.likes = memory.likes.filter((like) => !like.user.equals(user._id));
      } else {
        memory.likes.push({ user: user._id });
      }
  
      await memory.save();
  
      return res.status(200).json({ likes: memory.likes });
    } catch (error) {
      console.error("Error:", error); 
      return res.status(500).json({
        error: "Something went wrong when liking the memory",
      });
    }
  };

  const getMemoriesByUser = async (req, res) => {
    const userId = req.params.userId
  
    try {
      const memories = await Memory.find({ user: userId })
      if (!memories) {
        return res.status(404).json({ message: 'Memories not found for this user.' });
      }
      res.status(200).json(memories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
    getMemories,
    addMemory,
    deleteMemory,
    updateMemory,
    addComment,
    getComments,
    deleteComment,
    updateComment,
    likeMemory,
    getMemoriesByUser
}