const express = require('express');
const { getDestinations } = require('../controllers/exploreController');
const router = express.Router();

router.get('/', getDestinations);

module.exports = router;
