const { Schema, models, model } = require("mongoose");

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specification: {
    type: Object,
    unit: {
      type: String,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    packaging: {
      type: String,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  productImages: {
    type: Array,
    required: true,
  },
  extraSpecs: Array
});

const Product = models?.Product || model("Product", ProductSchema);

module.exports = Product;
