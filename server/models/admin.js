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
      message: String,
      sku: String,
      completed: Boolean,
      address: String,
      email: String,
      quantity: Number,
    },
  ],
});

const Admin = models?.Admin || model("Admin", AdminSchema);

module.exports = Admin;
