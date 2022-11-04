const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

// router.get('/', controller.example)
router.post('/', controller.bookFlight)

module.exports = router;