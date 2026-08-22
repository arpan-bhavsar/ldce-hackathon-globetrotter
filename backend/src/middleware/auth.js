const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: true, message: 'No token, authorization denied' });
  }

  try {
    // Extract token from 'Bearer <token>' format
    const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length).trim() : token;
    const decoded = jwt.verify(actualToken, 'hackathon_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: true, message: 'Token is not valid' });
  }
};
