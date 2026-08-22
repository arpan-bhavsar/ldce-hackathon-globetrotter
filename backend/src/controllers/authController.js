const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, city, country, additionalInfo, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: true, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ firstName, lastName, email, phone, city, country, additionalInfo, password: hashedPassword });
    await user.save();

    res.status(201).json({ error: false, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: true, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: true, message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, 'hackathon_secret', { expiresIn: '7d' });
    res.status(200).json({ error: false, token, user: { id: user._id, email: user.email, isAdmin: user.isAdmin } });
  } catch (error) {
    res.status(500).json({ error: true, message: "Server error" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: true, message: "User not found" });
    res.status(200).json({ error: false, user });
  } catch (error) {
    res.status(500).json({ error: true, message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, city, country, additionalInfo } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId, 
      { firstName, lastName, phone, city, country, additionalInfo },
      { new: true }
    ).select('-password');
    
    res.status(200).json({ error: false, user, message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Server error" });
  }
};