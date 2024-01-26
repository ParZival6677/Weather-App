//controllers/geolcationController.js
const axios = require('axios');

// OpenStreetMap Nominatim API configuration
const nominatimApiUrl = 'https://nominatim.openstreetmap.org/reverse';

// Controller function to get geolocation data and map visualization
async function getGeolocation(req, res) {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and Longitude are required parameters.' });
    }

    const geolocationData = await getGeolocationData(lat, lon);
    const mapData = await getMapData(lat, lon);

    res.json({
      geolocation: geolocationData,
      map: mapData,
    });
  } catch (error) {
    console.error('Error fetching geolocation data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Helper function to fetch geolocation data
async function getGeolocationData(lat, lon) {
  try {
    const response = await axios.get(`${nominatimApiUrl}?lat=${lat}&lon=${lon}&format=json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching geolocation data:', error.message);
    return {};
  }
}

// Helper function to fetch map data
async function getMapData(lat, lon) {
  const mapData = {
    location: { lat, lon },
  };
  return mapData;
}

module.exports = { getGeolocation };
