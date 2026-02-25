const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
     validate: {
    validator: v => isNaN(v),
    message: "Name cannot be numeric" },
    minlength: 2
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be positive"]
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);