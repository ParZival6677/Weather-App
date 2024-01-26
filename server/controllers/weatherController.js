//controller/weatherController.js
const axios = require('axios');

// OpenWeatherAPI configuration
const apiKey = '770b1f1c699533161e7c10f87f533d03';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Controller function to get weather data
async function getWeather(req, res) {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and Longitude are required parameters.' });
    }

    const response = await axios.get(apiUrl, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric', // Use 'imperial' for Fahrenheit
      },
    });

    const weatherData = parseWeatherData(response.data);
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Helper function to parse relevant weather data
function parseWeatherData(data) {
  return {
    temperature: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    coordinates: { lat: data.coord.lat, lon: data.coord.lon },
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    country: data.sys.country,
    rainVolume: data.rain ? data.rain['1h'] : 0, // Rain volume for the last 1 hour
  };
}

async function get14DayForecast(req, res) {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and Longitude are required parameters.' });
    }

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
        exclude: 'current,minutely,hourly',
      },
    });

    const forecastData = parse14DayForecast(response.data.daily);
    res.json({ forecast: forecastData });
  } catch (error) {
    console.error('Error fetching 14-day forecast data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Helper function to parse 14-day forecast data
function parse14DayForecast(dailyData) {
  return dailyData.map((day) => {
    return {
      date: new Date(day.dt * 1000).toLocaleDateString(),
      temperature: day.temp.day,
      description: day.weather[0].description,
      icon: day.weather[0].icon,
      humidity: day.humidity,
      windSpeed: day.wind_speed,
    };
  });
}

module.exports = { getWeather, get14DayForecast };