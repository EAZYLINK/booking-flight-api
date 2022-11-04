const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.getAllFlights)
router.post('/', controller.bookFlight)

module.exports = router;