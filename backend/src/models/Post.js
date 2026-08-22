const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  location: { type: String },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);