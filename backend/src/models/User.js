const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  city: String,
  country: String,
  password: { type: String, required: true },
  photoUrl: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);