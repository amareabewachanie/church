const express = require('express');
const router = express.Router();

// @route api/posts/test
// @desc test posts route
// @access public
router.get('/test', (req, res, next) => {
    res.status(200).json({ message: 'posts route works' });
});

module.exports = router;
