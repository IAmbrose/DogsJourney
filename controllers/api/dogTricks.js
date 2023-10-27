const DogTrick = require("../../models/dogTrick")

const getAllDogTricks = async (req, res) => {
    try {
      const dogTricks = await DogTrick.find().populate('user');
      if (!dogTricks) {
        return res.status(404).json({ message: 'Dog tricks not found.' });
      }
      res.status(200).json(dogTricks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const addDogTrick = async (req, res) => {
    const dogTrickData = req.body; 
    const user = res.locals.user; 
  
    if (!user.isAdmin) {
        return res.status(403).json({ error: 'Permission denied. Only admins can add dog tricks.' });
      }

    try {
      const newDogTrick = await DogTrick.create({ ...dogTrickData, user: user });
      res.status(201).json(newDogTrick);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  const toggleTrickCompleted = async (req, res) => {
    const dogTrickId = req.params.dogTrickId;
    const user = res.locals.user;
  
    try {
      const dogTrick = await DogTrick.findById(dogTrickId);
  
      if (!dogTrick) {
        return res.status(404).json({ message: 'Dog trick not found.' });
      }
  
      const userCompletion = dogTrick.tricksCompleted.find((entry) =>
        entry.user.equals(user._id)
      );
  
      if (!userCompletion) {
        dogTrick.tricksCompleted.push({ user: user._id, completed: true });
      } else {
        userCompletion.completed = !userCompletion.completed;
      }
  
      await dogTrick.save();
  
      res.status(200).json({ message: 'Trick completion status toggled successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  module.exports = {
    getAllDogTricks,
    addDogTrick,
    toggleTrickCompleted
  }