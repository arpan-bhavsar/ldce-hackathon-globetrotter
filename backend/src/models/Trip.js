const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  time: String,
  name: { type: String, required: true },
  cost: { type: Number, default: 0 },
  notes: String
});

const itineraryDaySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  location: String,
  activities: [activitySchema]
});

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  destination: { type: String, required: true },
  status: { type: String, default: "Upcoming" },
  itinerary: [itineraryDaySchema] // This holds the day-by-day plans!
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
