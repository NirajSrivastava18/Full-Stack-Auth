const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB Connected Successfully'));
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
