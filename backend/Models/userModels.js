const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "firstName is required"],
      minlength: [3, "firstName must be a minLength 3 charts"],
      maxlength: [255, "firstName must be a minLength 255 charts"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "lastName is required"],
      minlength: [3, "lastName must be a minLength 3 charts"],
      maxlength: [255, "lastName must be a minLength 255 charts"],
    },
    username: {
      type: String,
      trim: true,
      required: [true, "username is required"],
      minlength: [3, "username must be a minLength 3 charts"],
      maxlength: [255, "username must be a minLength 255 charts"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "email is token before so try other one"],
      required: [true, "username is required"],
      minlength: [3, "username must be a minLength 3 charts"],
      maxlength: [255, "username must be a minLength 255 charts"],
    },
    password: {
      type: String,
      required: [true, "username is required"],
    },
    role: {
      type: Number,
      default: 0, // 0 is user and 1 is admin[ that's role ]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
