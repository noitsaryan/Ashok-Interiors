const { models, model, Schema } = require("mongoose");

const AdminSchema = new Schema({
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
  orders: [
    {
      oid: String,
      payment: Object,
      status: Array,
      sku: String,
      completed: Boolean,
      email: String,
      quantity: Number,
      shipping_address: String,
      billing_address: String,
      phone: Number,
    },
  ],
});

const Admin = models?.Admin || model("Admin", AdminSchema);

module.exports = Admin;
