// server/controllers/newsController.js
const axios = require('axios');

const apiKey = 'fc7b8a1f9b24429cb1632ee2a78fd4fa';
const newsApiUrl = 'https://newsapi.org/v2/top-headlines';

async function getTopHeadlines(req, res) {
  try {
    const { country } = req.query;

    if (!country) {
      return res.status(400).json({ error: 'Country is a required parameter.' });
    }

    const response = await axios.get(newsApiUrl, {
      params: {
        country,
        apiKey,
      },
    });

    const articles = response.data.articles;
    res.json({ articles });
  } catch (error) {
    console.error('Error fetching top headlines:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getTopHeadlines };
