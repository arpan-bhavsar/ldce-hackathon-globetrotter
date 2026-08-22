const express = require('express');
const { getUserTrips, createTrip, getTripDetails, addActivity, deleteTrip } = require('../controllers/tripController');

const router = express.Router();

router.get('/', getUserTrips);
router.post('/', createTrip);
router.get('/:id', getTripDetails);
router.post('/:id/activities', addActivity);
router.delete('/:id', deleteTrip);

module.exports = router;