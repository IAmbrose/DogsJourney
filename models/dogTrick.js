const mongoose = require("mongoose");
const User = require("./user");

const trickCompletedSchema = new mongoose.Schema(
    {
      completed: {
        type: Boolean,
        default: false,
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
    }
  )


const dogTricksSchema = new mongoose.Schema(
    {
      trick_name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      difficulty_level: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
      },
      tricksCompleted: [trickCompletedSchema],
    },
    {
      timestamps: true,
    }
  );
  

const DogTrick = mongoose.model("DogTrick", dogTricksSchema);

module.exports = DogTrick;