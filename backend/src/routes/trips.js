const express = require('express');
const { getUserTrips, createTrip, getTripDetails, addActivity } = require('../controllers/tripController');

const router = express.Router();

router.get('/', getUserTrips);
router.post('/', createTrip);
router.get('/:id', getTripDetails);
router.post('/:id/activities', addActivity);

module.exports = router;