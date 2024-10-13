const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  socialMediaHandle: {
    type: String,
    required: true,
  },
  files: [
    {
      filename: String,
      path: String,
      originalname: String,
    },
  ],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
