const { models, model, Schema } = require("mongoose");

const RegisterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  token: {
    type: String,
    required: true,
    select: false,
  },
  shipping_address: {
    type: String,
  },
  cart: {
    type: Array,
  },
  order: [
    {
      oid: String,
      payment: Object,
      status: Array,
      sku: String,
      quantity: Number,
      completed: Boolean,
      shipping_address: String,
      billing_address: String,
      phone: Number
    },
  ],
});

const Register = models?.Register || model("Register", RegisterSchema);

module.exports = Register;
