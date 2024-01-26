const express = require('express');
const path = require('path'); 
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

const indexPath = path.join(__dirname,'..', 'public', 'index.html');
 

app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

app.use('/css', express.static(path.join(__dirname, '..', 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'public', 'js')));


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
