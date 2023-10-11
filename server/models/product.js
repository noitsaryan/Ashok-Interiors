const {Schema, models, model} = require('mongoose')

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
});

const Product = models?.Product || model('Product', ProductSchema)

module.exports = Product
