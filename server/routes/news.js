// server/routes/news.js
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/top-headlines', newsController.getTopHeadlines);

module.exports = router;
