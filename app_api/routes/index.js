const express = require('express');
const router = express.Router();

const {expressjwt:jwt} = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms:['HS256']
    });
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication')
router
    .route('/trips')
    .get(tripsController.getAllTrips)
    .post(auth,tripsController.tripsAddTrip);
router
    .route('/login')
    .post(authController.login);
router
    .route('/register')
    .post(authController.register);
router
    .route('/trip/:tripCode')
    .get(tripsController.getTripByCode)
    .put(auth,tripsController.tripsUpdateTrip);

router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindCode)

module.exports = router;