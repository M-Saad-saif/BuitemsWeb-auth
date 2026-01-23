const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI ||"mongodb://127.0.0.1:27017/buitemsweb";

const connetionToMongooDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    // chekcing if we are connected to local or atlas
    const host = mongoose.connection.host; // checing the URL string
    if (host.includes("mongodb.net")) {
      console.log(" Connected to: MongoDB Atlas (Cloud)");
    } else {
      console.log(" Connected to: Local MongoDB");
    }
  } catch (error) {
    console.log(error.message, "connection failed to mongoDB");
  }
};

module.exports = connetionToMongooDB;
