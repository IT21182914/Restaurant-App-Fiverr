const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  topSeller: {
    type: Boolean,
    default: false,
  },
  salesCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
