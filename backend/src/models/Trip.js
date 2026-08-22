const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  destination: { type: String, required: true },
  status: { type: String, default: "Upcoming" } // Ongoing, Upcoming, Completed
}, { timestamps: true });

const { getTripDetails, addActivity } = require('../controllers/tripController'); // Make sure to add these to the import at the top!

router.get('/:id', getTripDetails);
router.post('/:id/activities', addActivity);

module.exports = mongoose.model('Trip', tripSchema);