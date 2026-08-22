const Destination = require('../models/Destination');

exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.status(200).json({ error: false, destinations });
  } catch (err) {
    res.status(500).json({ error: true, message: "Error fetching destinations" });
  }
};
