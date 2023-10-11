const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URI) {
      console.log("Please add URI for connection!");
    }

    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise();
    }

    return await mongoose.connect(process.env.DATABASE_URI);

  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;