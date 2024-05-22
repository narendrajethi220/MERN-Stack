const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/mern_admin";
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connected Succefully !");
  } catch (error) {
    console.error("Error in connecting Database !");
    process.exit(0);
  }
};

module.exports = connectDB;
