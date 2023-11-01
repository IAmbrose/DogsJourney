const DogProfile= require("../../models/dogProfile")

const addDogProfile = async (req, res) => {
    const profileData = req.body; 
    const user = res.locals.user; 
  
    try {
      const newDogProfile = await DogProfile.create({ ...profileData, user: user });
      if (!newDogProfile) {
        return res.status(404).json({ message: 'Profile not found.' });
      }
      res.status(201).json(newDogProfile);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  const getAllDogProfiles = async (req, res) => {
    try {
      const dogProfiles = await DogProfile.find().populate('user');
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
      const dogProfile = await DogProfile.find({ user: user }).populate('user');
      if (!dogProfile) {
        return res.status(404).json({ message: 'Profile not found.' });
      }
      res.status(200).json(dogProfile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateDogProfile = async (req, res) => {
    const user = res.locals.user;
    const dogProfileId = req.params.dogProfileId;
    const updateData = req.body

    try{
      const dogProfileToUpdate = await DogProfile.findOne({
        _id: dogProfileId,
        user: user._id,
      })
      if (!dogProfileToUpdate) {
        return res.status(404).json({ message: 'Dog Profile not found.' });
      }
      dogProfileToUpdate.name = updateData.name
      dogProfileToUpdate.description = updateData.description;
      dogProfileToUpdate.imageURL = updateData.imageURL;

      await dogProfileToUpdate.save();
      res.status(200).json({ message: 'Dog Profile updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = {
    addDogProfile,
    getAllDogProfiles,
    getDogProfile,
    updateDogProfile
  }