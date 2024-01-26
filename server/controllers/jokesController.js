// server/controllers/jokesController.js
const axios = require('axios');

const jokesApiUrl = 'https://api.chucknorris.io/jokes/random';

async function getRandomJoke(req, res) {
  try {
    const response = await axios.get(jokesApiUrl);

    const joke = response.data.value;
    res.json({ joke });
  } catch (error) {
    console.error('Error fetching random joke:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getRandomJoke };
