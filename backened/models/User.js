const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: null,

  },
  province: {
    type: String,
    default: null,

  },
  city: {
    type: String,
    default: null,
  },
  stores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verifiedUser: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
