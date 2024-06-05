const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose
      .connect('mongodb+srv://Auth:Auth1234@cluster0.rkqwd.mongodb.net/Auth')
      .then(() => console.log('MongoDB Connected Successfully'));
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
