const express = require("express");
const router = express.Router();
const dogBreedsCtrl = require("../../controllers/api/dogBreeds");
const { checkToken } = require("../../config/checkToken");

// POST /api/users
router.get("/search/:name", dogBreedsCtrl.getDogData);
router.get("/", dogBreedsCtrl.getAllDogBreedList);
router.post("/search/:name", checkToken, dogBreedsCtrl.addDog);


module.exports = router;