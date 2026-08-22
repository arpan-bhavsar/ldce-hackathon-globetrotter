const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

// Security Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // increased for testing
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

app.use(express.json());
app.use('/api/posts', require('./routes/posts'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes will go here
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/destinations', require('./routes/explore'));
app.use('/api/admin', require('./routes/admin'));

// Global Error Handler
app.use(errorHandler);

//const PORT = process.env.PORT
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));