const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile model
const Profile = require('../../models/Profile');
// Load User profile
const User = require('../../models/User');
// Load Profile Validators
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const { Passport } = require('passport');
// @route api/profile/test
// @desc test profile route
// @access public
router.get('/test', (req, res, next) => {
    res.status(200).json({ message: 'profile router works!' });
});
// @route GET api/profile
// @desc get current users profile
// @access private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        const errors = {};
        Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'email'])
            .then((profile) => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user';
                    return res.status(404).json(errors);
                }
                res.status(200).json(profile);
            })
            .catch((err) =>
                res
                    .status(404)
                    .json({ profile: 'There is no profile for this user' })
            );
    }
);

// @route GET api/profile/all
// @desc get All profile
// @access public
router.get('/all', (req, res, next) => {
    let errors = {};
    Profile.find()
        .populate('user', ['name', 'email'])
        .then((profiles) => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles';
                res.status(404).json(errors);
            }
            res.status(200).json(profiles);
        })
        .catch((err) =>
            res.status(404).json({ profile: 'There are no profiles' })
        );
});

// @route GET api/profile/:handle
// @desc get profile by its handle
// @access public

router.get('/handle/:handle', (req, res, next) => {
    let errors = {};
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'email'])
        .then((profile) => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.status(200).json(profile);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ profile: 'There is no profile for this user' })
        );
});

// @route GET api/profile/user/:user_id
// @desc get profile by the user id
// @access public

router.get('/user/:user_id', (req, res, next) => {
    let errors = {};
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'email'])
        .then((profile) => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.status(200).json(profile);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ profile: 'There is no profile for this user' })
        );
});

// @route POST api/profile
// @desc create or edit user profile
// @access private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        const { errors, isValid } = validateProfileInput(req.body);
        // Check for validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        // Split skills
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }
        //Hnadling social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook)
            profileFields.social.facebook = req.body.facebook;
        if (req.body.instagram)
            profileFields.social.instagram = req.body.instagram;
        if (req.body.linkedin)
            profileFields.social.linkedin = req.body.linkedin;
        Profile.findOne({ user: req.user.id }).then((profile) => {
            if (profile) {
                //Update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                    .then((profile) => {
                        res.status(201).json(profile);
                    })
                    .catch((err) => res.status(400).json(err));
            } else {
                // New profile
                // Check handle exists
                Profile.findOne({ handle: profileFields.handle }).then(
                    (profile) => {
                        if (profile) {
                            errors.handle = 'This handle already exists';
                            res.status(400).json(errors);
                        }
                        // Save Profile
                        new Profile(profileFields)
                            .save()
                            .then((profile) => res.status(201).json(profile));
                    }
                );
            }
        });
    }
);

// @route POST api/profile/experience
// @desc add experience for a profile
// @access private
router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        const { errors, isValid } = validateExperienceInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                const newExpreience = {
                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description,
                };
                // Add to profile experience
                profile.experience.unshift(newExpreience);
                profile.save().then((profile) => res.status(201).json(profile));
            })
            .catch((err) =>
                res
                    .status(404)
                    .json({ profile: 'There is no profile for this user' })
            );
    }
);
// @route POST api/profile/education
// @desc add education for a profile
// @access private
router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        const { errors, isValid } = validateEducationInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                const newEducation = {
                    school: req.body.school,
                    degree: req.body.degree,
                    fieldofstudy: req.body.fieldofstudy,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description,
                };
                // Add to profile experience
                profile.education.unshift(newEducation);
                profile.save().then((profile) => res.status(201).json(profile));
            })
            .catch((err) =>
                res
                    .status(404)
                    .json({ profile: 'There is no profile for this user' })
            );
    }
);
// @route DELETE api/profile/experience/:exp_id
// @desc delete experience from a user profile
// @access private
router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                // Get an endex to remove
                const removeIndex = profile.experience
                    .map((item) => item.id)
                    .indexOf(req.params.exp_id);
                // Splice out of array
                profile.experience.splice(removeIndex, 1);
                // Save
                profile
                    .save()
                    .then((profile) => res.status(201).json(profile))
                    .catch((err) => res.status(400).json(err));
            })
            .catch((err) => res.status(400).json(err));
    }
);

// @route DELETE api/profile/education/:edu_id
// @desc delete education from a profile
// @access private
router.delete(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                // Getting index to remove
                const removeIndex = profile.education
                    .map((item) => item.id)
                    .indexOf(req.params.edu_id);
                // Splice out of array
                profile.education.splice(removeIndex, 1);
                profile
                    .save()
                    .then((profile) => res.status(201).json(profile))
                    .catch((err) =>
                        res.status(400).json({
                            education: 'there is no education for this profile',
                        })
                    );
            })
            .catch((err) =>
                res
                    .status(404)
                    .json({ profile: 'There is no education for this user' })
            );
    }
);

// @route DELETE api/profile
// @desc delete a profile
// @access private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        Profile.findOneAndRemove({ user: req.user.id })
            .then(() => {
                User.findOneAndRemove({ _id: req.user.id }).then(() => {
                    res.json({ success: true });
                });
            })
            .catch((err) =>
                res
                    .status(404)
                    .json({ profile: 'Unable to delete this profile' })
            );
    }
);
module.exports = router;
