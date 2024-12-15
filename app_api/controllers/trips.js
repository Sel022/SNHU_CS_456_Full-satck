const { model } = require("mongoose");
const mongoose = require("mongoose");
const Trip = require('../models/travlr');

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
// mongoose.set('useFindAndModify', false);

const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find({});
        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: "Trips not found" });
        }
        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err });
    }
};


const getTripByCode = async (req, res) => {
    try {
        const trip = await Trip.find({ 'code': req.params.tripCode });
        if (!trip || trip.length === 0) {
            return res.status(404).json({ message: "That trip was not found" });
        }
        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err });
    }
};


const tripsAddTrip = async (req, res) => {
    try {
        const trip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description,
        });
        return res.status(201).json(trip);
    } catch (err) {
        return res.status(400).json({ error: err.message || 'Error creating trip' });
    }
};

const tripsDeleteTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            console.log("inside trips.js on server #tripsDeleteTrip");
            Trip.findOneAndDelete({ 'code': req.params.tripCode })


                .then(trip => {
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });

                    }
                    return res


                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    return res
                        .status(500) // server error
                        .json(err);
                })
            console.log("return from delete trip");

        });


}

const tripsUpdateTrip = async (req, res) => {
    try {
        // Find and update the trip
        const trip = await Trip.findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image, // corrected redundancy
                description: req.body.description,
            },
            { new: true } // Return the updated trip
        );
        // If no trip is found, return a 404
        if (!trip) {
            return res.status(404).send({
                message: ` Trip not found with code ${req.params.tripCode}`,
            });
        }
        // Return the updated trip
        return res.status(200).json(trip);
    } catch (err) {
        // Handle specific errors like ObjectId or general server errors
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: ` Trip not found with code ${req.params.tripCode}`,
            });
        }
        // If it's a server error, return 500 status
        return res.status(500).json({ message: err.message || 'Internal server error' });
    }
};

const tripsFindCode = async (req, res) => {
    Trip.find({ code: req.params.tripCode }).exec((err, trip) => {
        if (!trip) {
            return res.status(404).json({ message: "trip not found" });
        } else if (err) {
            return res.status(404).json(err);
        } else {
            return res.status(200).json(trip);
        }
    });
};


module.exports = {
    getAllTrips,
    getTripByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip,
    tripsFindCode,
};

