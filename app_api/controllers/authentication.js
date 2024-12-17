
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

const register = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: "All fields required" });
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
        });
        user.setPassword(req.body.password);
        await user.save();
        const token = user.generateJwt();
        return res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
};

const login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "All fields required" });
        }
        passport.authenticate('local', async (err, user, info) => {
            console.log('err',err)
            console.log('user',user)
            console.log('info',info)
            if (err) {
                return res.status(404).json(err);
            }

            if (user) {
                const token = user.generateJwt();
                return res.status(200).json({ token });
            } else {
                return res.status(401).json(info);
            }
        })(req, res);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = {
    register,
    login
};