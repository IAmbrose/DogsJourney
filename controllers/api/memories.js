const Memory = require("../../models/memory")

// const getMemories = async (req, res) => {

// }

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

module.exports = {
    addMemory
}