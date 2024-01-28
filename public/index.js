const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', async () => {
  const cityInput = document.querySelector('.search-box input');
  const city = cityInput.value;

  if (city === '') return;

  try {
    const response = await fetch('/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ city }),
    });

    const weatherData = await response.json();

    if (weatherData.error) {
      container.style.height = '400px';
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      error404.style.display = 'block';
      error404.classList.add('fadeIn');
      return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');
    const feelsLike = document.querySelector('.weather-details .feels-like span');
    const pressure = document.querySelector('.weather-details .pressure span');
    const rainVolume = document.querySelector('.weather-details .rain span');
    const countryElement = document.querySelector('.weather-details .country-code span');

    switch (weatherData.current.description.toLowerCase()) {
      case 'clear':
        image.src = 'images/clear.png';
        break;

      case 'rain':
        image.src = 'images/rain.png';
        break;

      case 'snow':
        image.src = 'images/snow.png';
        break;

      case 'clouds':
        image.src = 'images/cloud.png';
        break;

      case 'haze':
        image.src = 'images/mist.png';
        break;

      case 'mist':
        image.src = 'images/mist.png';
        break;

      default:
        image.src = '';
    }

    temperature.innerHTML = `${parseInt(weatherData.current.temperature)}<span>°C</span>`;
    description.innerHTML = `${weatherData.current.description}`;
    humidity.innerHTML = `${weatherData.humidity}%`;
    wind.innerHTML = `${parseInt(weatherData.windSpeed)}Km/h`;
    feelsLike.innerHTML = `${parseInt(weatherData.feelsLike)}<span>°C</span>`;
    pressure.innerHTML = `${weatherData.pressure}hPa`;
    rainVolume.innerHTML = `${weatherData.rainVolume}mm`;
    countryElement.textContent = `${weatherData.countryCode}`;
    
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '600px';

  } catch (error) {
    console.error('Error:', error);
  }
});
