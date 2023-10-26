const mongoose = require("mongoose");
const User = require("./user");

const dogProfileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,
          },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)

const DogProfile = mongoose.model("DogProfile", dogProfileSchema);

module.exports = DogProfile;