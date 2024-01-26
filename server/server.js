const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
const weatherRoutes = require('./routes/weather');
const geolocationRoutes = require('./routes/geolocation');
const newsRoutes = require('./routes/news');
const jokesRoutes = require('./routes/jokes');

app.use('/api/weather', weatherRoutes);
app.use('/api/geolocation', geolocationRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/jokes', jokesRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
