const mongoose = require("mongoose");
const User = require("./user");

const dogBreedSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image_link: {
            type: String,
            required: true
        },
        good_with_children: {
            type: Number,
            required: true,
        },
        good_with_other_dogs: {
            type: Number,
            required: true,
        },
        shedding: {
            type: Number,
            required: true,
        },
        grooming: {
            type: Number,
            required: true,
        },
        drooling: {
            type: Number,
            required: true,
        },
        coat_length: {
            type: Number,
            required: true,
        },
        good_with_strangers: {
            type: Number,
            required: true,
        },
        playfulness: {
            type: Number,
            required: true,
        },
        protectiveness: {
            type: Number,
            required: true,
        },
        trainability: {
            type: Number,
            required: true,
        },
        energy: {
            type: Number,
            required: true,
        },
        barking: {
            type: Number,
            required: true,
        },
        min_life_expectancy: {
            type: Number,
            required: true,
        },
        max_life_expectancy: {
            type: Number,
            required: true,
        },
        max_height_male: {
            type: Number,
            required: true,
        },
        max_height_female: {
            type: Number,
            required: true,
        },
        max_weight_male: {
            type: Number,
            required: true,
        },
        max_weight_female: {
            type: Number,
            required: true,
        },
        min_height_male: {
            type: Number,
            required: true,
        },
        min_height_female: {
            type: Number,
            required: true,
        },
        min_weight_male: {
            type: Number,
            required: true,
        },
        min_weight_female: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,
          },
      },
      {
        timestamps: true,
      },
    );

const DogBreed = mongoose.model("DogBreed", dogBreedSchema);

module.exports = DogBreed;