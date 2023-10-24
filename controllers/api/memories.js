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
        return res.status(404).json({ message: 'Dog not found in your memories.' });
      }
  
      res.status(200).json({ message: 'Dog removed from your memories.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = {
    getMemories,
    addMemory,
    deleteMemory
}