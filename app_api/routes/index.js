const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router
    .route('/trip')
    .get(tripsController.getAllTrips)
    .post(tripsController.tripsAddTrip);

router
    .route('/trip/:tripCode')
    .get(tripsController.getTripByCode)
    .put(tripsController.tripsUpdateTrip);

router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindCode)

module.exports = router;