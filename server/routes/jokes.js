// server/routes/jokes.js
const express = require('express');
const router = express.Router();
const jokesController = require('../controllers/jokesController');

router.get('/random', jokesController.getRandomJoke);

module.exports = router;
