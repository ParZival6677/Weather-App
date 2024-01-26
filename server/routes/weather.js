const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/', weatherController.getWeather);
router.get('/14-day-forecast', weatherController.get14DayForecast);

module.exports = router;