const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/weather', async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City not provided' });
  }

  const APIKey = process.env.OPENWEATHERMAP_API_KEY;

  try {
    // Fetch current weather
    const currentWeatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);

    const weatherData = {
      current: {
        temperature: currentWeatherResponse.data.main.temp,
        description: currentWeatherResponse.data.weather[0].description,
      },
      feelsLike: currentWeatherResponse.data.main.feels_like,
      humidity: currentWeatherResponse.data.main.humidity,
      windSpeed: currentWeatherResponse.data.wind.speed,
      countryCode: currentWeatherResponse.data.sys.country,
      rainVolume: currentWeatherResponse.data.rain ? currentWeatherResponse.data.rain['1h'] : 0,
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error:', error);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
