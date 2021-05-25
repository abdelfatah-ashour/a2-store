const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "category is required"],
      minlength: [3, "category must be a minLength 3 charts"],
      maxlength: [32, "category must be a minLength 255 charts"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
