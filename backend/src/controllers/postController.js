const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json({ error: false, posts });
  } catch (err) {
    res.status(500).json({ error: true, message: "Error fetching posts" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { authorName, location, content } = req.body;
    const post = new Post({ authorName, location, content });
    await post.save();
    res.status(201).json({ error: false, post });
  } catch (err) {
    res.status(500).json({ error: true, message: "Error creating post" });
  }
};