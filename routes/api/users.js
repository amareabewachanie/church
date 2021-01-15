const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

//Load validators
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// Load User model
const User = require('../../models/User');
const keys = require('../../config/keys');
// @route api/users/test
// @desc test users route
// @access public
router.get('/test', (req, res, next) => {
    res.status(200).json({ message: 'user route works' });
});

// @route POST api/users/register
// @desc register user route
// @access public
router.post('/register', (req, res, next) => {
    // validate user input
    const { errors, isValid } = validateRegisterInput(req.body);
    // check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            bcrypt
                .genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then((user) => {
                            res.status(201).json({ user });
                        });
                    });
                })
                .catch((err) => console.log(err));
        }
    });
});

// @route POST api/users/login
// @desc login  user route
// @access public
router.post('/login', (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body);
    //Check the validation
    if (!isValid) {
        return res.status(401).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find a user by email
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            errors.email = 'The user is not found';
            return res.status(404).json(errors);
        }
        // console.log(user.password);
        // Check Password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // User matched
                // create jwt payload
                const payload = { id: user.id, email: user.email };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        return res.json({
                            success: true,
                            token: 'Bearer ' + token,
                        });
                    }
                );
            } else {
                errors.password = 'Incorrect password';
                return res.status(400).json(errors);
            }
        });
    });
});

// @route GET api/users/current
// @desc current  user route
// @access private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        });
    }
);

// @route GET api/users/all
// @desc get all  users
// @access public
router.get('/all', (req, res, next) => {
    User.find()
        .then((profiles) => {
            if (!profiles) {
                return res.status(404).json({ user: 'There is no user until' });
            }
            res.status(200).json(profiles);
        })
        .then((err) =>
            res.status(404).json({ user: 'There is no user untill' })
        );
});
// @route DELETE api/users/:user_id
router.delete('/:id', (req, res, next) => {
    console.log(req.params.id);
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => res.status(404).json({ user: 'User not found' }));
});
module.exports = router;
