const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    profileImage: {
      type: String, 
    },
    message: {
      type: String,
      required: [true, "Message field is required"],
    },
    group: {
      type: String,
      required: [true, "Group field is required"],
    },
    reviewImages: {
      type: [String], 
      default: [],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Rating is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite on hot reload
module.exports =
  mongoose.models.Reviews || mongoose.model("Reviews", ReviewsSchema);
