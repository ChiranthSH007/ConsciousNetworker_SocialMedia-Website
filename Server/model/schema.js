const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  authname: { type: String },
  email: { type: String },
  picture: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("User", userSchema);
