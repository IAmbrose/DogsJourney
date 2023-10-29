const DogBreed = require("../../models/dogBreed")
const axios = require("axios");

const getDogData = async (req, res) => {
  const dogBreedBaseUrl = "https://api.api-ninjas.com/v1/dogs";
  const apiKey = process.env.DOG_API_KEY;

  const searchQuery = req.params.name;

  try {
    const response = await axios.get(dogBreedBaseUrl, {
      headers: {
        'X-Api-Key': apiKey,
      },
      params: {
        name: searchQuery 
      },
    });
    
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ error: "Dog not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getAllDogBreedList = async (req, res) => {
  const dogBreedListUrl = "https://dog.ceo/api/breeds/list/all";

  try {
    const response = await axios.get(dogBreedListUrl);

    if (response.data.status === "success") {
      const breedList = response.data.message;

      res.status(200).json(breedList);
    } else {
      res.status(500).json({ error: "Failed to fetch dog breed list" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching dog breed list" });
  }
};

const addDogToWishList = async (req, res) => {
  const dogData = req.body; 
  const user = res.locals.user; 

  try {
    const newDog = await DogBreed.create({ ...dogData, user: user });
    res.status(201).json(newDog);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getAllDogFromWishList = async (req, res) => {
  const user = res.locals.user;

  try {
    const dogsInWishList = await DogBreed.find({ user: user });
    if (!dogsInWishList) {
      return res.status(404).json({ message: 'Dogs not found in your wish list.' });
    }
    res.status(200).json(dogsInWishList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDogFromWishList = async (req, res) => {
  const user = res.locals.user;
  const dogId = req.params.dogId;

  try{
    const dogToDelete = await DogBreed.findOneAndDelete({
      _id: dogId,
      user: user._id,
    });
    if (!dogToDelete) {
      return res.status(404).json({ message: 'Dog not found in your wish list.' });
    }

    res.status(200).json({ message: 'Dog removed from your wish list.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDogData,
  getAllDogBreedList,
  addDogToWishList,
  getAllDogFromWishList,
  deleteDogFromWishList
}
