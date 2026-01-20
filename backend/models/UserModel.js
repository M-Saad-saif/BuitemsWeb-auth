const mongoose = require ('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
  Fullname: {
    type: String,
  },
  Semester: {
    type: String,
  },
  Email: {
    type: String,
    unique: true,
  },
  Password: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  ProfilePic:{
    type:String,
    // default:" no Pic"
  }
});

module.exports  = mongoose.model("user", UserSchema);
