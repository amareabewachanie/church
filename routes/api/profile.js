const express = require('express');
const router = express.Router();
// @route api/profile/test
// @desc test profile route
// @access public
router.get('/test', (req, res, next) => {
    res.status(200).json({ message: 'profile router works!' });
});
module.exports = router;
