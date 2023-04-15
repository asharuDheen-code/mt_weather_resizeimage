const mongoose = require("mongoose");

const ImgSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImgSchema);
