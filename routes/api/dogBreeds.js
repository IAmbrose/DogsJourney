const express = require("express");
const router = express.Router();
const dogBreedsCtrl = require("../../controllers/api/dogBreeds");
const { checkToken } = require("../../config/checkToken");

// POST /api/users
router.get("/search/:name", dogBreedsCtrl.getDogData);
router.get("/list", dogBreedsCtrl.getAllDogBreedList);
router.post("/wishlist", checkToken, dogBreedsCtrl.addDogToWishList);
router.get("/wishlist", checkToken, dogBreedsCtrl.getAllDogFromWishList);
router.delete("/wishlist/:dogId", checkToken, dogBreedsCtrl.deleteDogFromWishList);


module.exports = router;