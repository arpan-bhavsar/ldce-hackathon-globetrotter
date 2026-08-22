const Trip = require('../models/Trip');

// Get all trips for the dashboard
exports.getUserTrips = async (req, res) => {
  try {
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
      userId: '60d5ecb54cb7c1a3b2345678', // Dummy ID for hackathon speed
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

// Get a single trip with its full itinerary
exports.getTripDetails = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: true, message: "Trip not found" });
    res.status(200).json({ error: false, trip });
  } catch (error) {
    res.status(500).json({ error: true, message: "Error fetching trip" });
  }
};

// Add a day/activity to the itinerary
exports.addActivity = async (req, res) => {
  try {
    const { date, location, time, name, cost, notes } = req.body;
    const trip = await Trip.findById(req.params.id);

    if (!trip) return res.status(404).json({ error: true, message: "Trip not found" });

    const targetDate = new Date(date).toISOString().split('T')[0];
    let day = trip.itinerary.find(d => d.date.toISOString().split('T')[0] === targetDate);

    if (!day) {
      trip.itinerary.push({ date: new Date(date), location, activities: [] });
      day = trip.itinerary[trip.itinerary.length - 1];
    }

    day.activities.push({ time, name, cost, notes });
    day.activities.sort((a, b) => a.time.localeCompare(b.time));

    await trip.save();
    res.status(200).json({ error: false, trip });
  } catch (error) {
    res.status(500).json({ error: true, message: "Error adding activity" });
  }
};