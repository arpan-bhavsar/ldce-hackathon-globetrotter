const Trip = require('../models/Trip');

// Get all trips for the dashboard
exports.getUserTrips = async (req, res) => {
  try {
    // We are fetching all trips right now for hackathon speed!
    const trips = await Trip.find().sort({ startDate: 1 });
    res.status(200).json({ error: false, trips });
  } catch (error) {
    res.status(500).json({ error: true, message: "Error fetching trips" });
  }
};

// Create a new trip
exports.createTrip = async (req, res) => {
  try {
    const { title, startDate, endDate, destination } = req.body;

    const trip = new Trip({
      userId: '60d5ecb54cb7c1a3b2345678', // Dummy ID to save time right now
      title,
      startDate,
      endDate,
      destination,
      status: "Upcoming"
    });

    await trip.save();
    res.status(201).json({ error: false, trip });
  } catch (error) {
    res.status(500).json({ error: true, message: "Error creating trip" });
  }
};
backend/src/routes/trips.js
const express = require('express');
const { getUserTrips, createTrip } = require('../controllers/tripController');

const router = express.Router();

router.get('/', getUserTrips);
router.post('/', createTrip);

module.exports = router;