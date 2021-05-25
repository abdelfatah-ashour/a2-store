const mongoose = require("mongoose");

// const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
      minlength: [3, "name must be a minLength 3 charts"],
      maxlength: [32, "name must be a minLength 255 charts"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "title is required"],
      minlength: [3, "title must be a minLength 3 charts"],
      maxlength: [32, "title must be a minLength 255 charts"],
    },
    company: {
      type: String,
      trim: true,
      required: [true, "company is required"],
      minlength: [3, "company must be a minLength 3 charts"],
      maxlength: [32, "company must be a minLength 255 charts"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "price is required"],
      min: [0, "price must be more than $00:00"],
    },
    category: {
      type: String,
      enum: ["mobile", "clothes"],
      required: [true, "category is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "description is required"],
      minlength: [3, "description must be a minLength 3 charts"],
      maxlength: [1024, "description must be a minLength 255 charts"],
    },
    photo: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, "quantity must be more than 0 (ZERO)"],
      min: [1, "quantity must be more than 1 product"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
