const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile model
const Profile = require('../../models/Profile');
// Load User profile
const User = require('../../models/User');
// @route api/profile/test
// @desc test profile route
// @access public
router.get('/test', (req, res, next) => {
    res.status(200).json({ message: 'profile router works!' });
});
// @route api/profile
// @desc get current users profile
// @access private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        const errors = {};
        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user';
                    return res.status(404).json(errors);
                }
                res.status(200).json(profile);
            })
            .catch((err) => res.status(404).json(err));
    }
);
module.exports = router;
