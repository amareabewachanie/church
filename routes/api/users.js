const express = require('express');
const router = express.Router();

// @route api/users/test
// @desc test users route
// @access public
router.get('/test', (req, res, next) => {
    res.status(200).json({ message: 'user route works' });
});

module.exports = router;
