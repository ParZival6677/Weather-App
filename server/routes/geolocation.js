const express = require('express');
const router = express.Router();
const geolocationController = require('../controllers/geolocationController');

router.get('/', geolocationController.getGeolocation);

module.exports = router;
