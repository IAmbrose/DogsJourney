const DogProfile= require("../../models/dogProfile")

const addDogProfile = async (req, res) => {
    const profileData = req.body; 
    const user = res.locals.user; 
  
    try {
      const newDogProfile = await DogProfile.create({ ...profileData, user: user });
      res.status(201).json(newDogProfile);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  const getAllDogProfiles = async (req, res) => {
    try {
      const dogProfiles = await DogProfile.find();
      if (!dogProfiles) {
        return res.status(404).json({ message: 'Profile not found.' });
      }
      res.status(200).json(dogProfiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getDogProfile = async (req, res) => {
    const user = res.locals.user;
  
    try {
      const dogProfile = await DogProfile.find({ user: user });
      if (!dogProfile) {
        return res.status(404).json({ message: 'Memories not found.' });
      }
      res.status(200).json(dogProfile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    addDogProfile,
    getAllDogProfiles,
    getDogProfile
  }