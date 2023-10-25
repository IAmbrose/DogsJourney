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


module.exports = {
    getMemories,
    addMemory,
    deleteMemory,
    updateMemory,
    addComment,
    getComments
}