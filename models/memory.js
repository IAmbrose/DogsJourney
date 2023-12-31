const mongoose = require("mongoose");
const User = require("./user");

const commentSchema = new mongoose.Schema(
    {
      text: {
        type: String,
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
  );

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const memorySchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,
          },
        imageURL: {
            type: String,
        },
        comments: [commentSchema],
        likes: [likeSchema],
    },
    {
        timestamps: true,
    },
)

const Memory = mongoose.model("Memory", memorySchema);

module.exports = Memory;