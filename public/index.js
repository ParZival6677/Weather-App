const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const additionalApiButtons = document.querySelector('.additional-api');

document.addEventListener('DOMContentLoaded', () => {
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

      // Show additional API buttons
      additionalApiButtons.classList.remove('hidden');

      // Event listener for the News button
      const newsButton = document.querySelector('.news-button');
      newsButton.addEventListener('click', async () => {
        clearUI();
        try {
          const response = await fetch('/news');
          const newsData = await response.json();

          // Update the UI with news data
          const newsElement = document.querySelector('.news');
          newsElement.innerHTML = generateNewsHTML(newsData);
        } catch (error) {
          console.error('Fetch News Error:', error);
        }
      });

      // Event listener for the Exchange Rate button
      const exchangeRateButton = document.querySelector('.exchange-rates-button');
      if (exchangeRateButton) {
        exchangeRateButton.addEventListener('click', async () => {
          clearUI();
          try {
            const response = await fetch('/exchange-rates');
            const exchangeRatesData = await response.json();

            // Update the UI with exchange rates data
            const exchangeRatesElement = document.querySelector('.exchange-rates');
            exchangeRatesElement.innerHTML = generateExchangeRatesHTML(exchangeRatesData);
          } catch (error) {
            console.error('Fetch Exchange Rates Error:', error);
          }
        });
      }

      function generateNewsHTML(newsData) {
        let html = '<ul>';
        newsData.forEach(article => {
          html += `<li>${article.title}</li>`;
        });
        html += '</ul>';
        return html;
      }

      function generateExchangeRatesHTML(exchangeRatesData) {
        let html = '<ul>';
        for (const currency in exchangeRatesData) {
          html += `<li>${currency}: ${exchangeRatesData[currency]}</li>`;
        }
        html += '</ul>';
        return html;
      }

      function clearUI() {
        // Clear weather-related elements
        image.src = '';
        temperature.innerHTML = '';
        description.innerHTML = '';
        humidity.innerHTML = '';
        wind.innerHTML = '';
        feelsLike.innerHTML = '';
        pressure.innerHTML = '';
        rainVolume.innerHTML = '';
        countryElement.textContent = '';

        // Clear weather-related icons
        const humidityIcon = document.querySelector('.weather-details .humidity i');
        const feelsLikeIcon = document.querySelector('.weather-details .feels-like i');
        const windIcon = document.querySelector('.weather-details .wind i');
        const rainIcon = document.querySelector('.weather-details .rain i');
        const pressureIcon = document.querySelector('.weather-details .pressure i');
        const countryCodeIcon = document.querySelector('.weather-details .country-code i')

        humidityIcon.className = ''; // Remove all classes from the icon
        feelsLikeIcon.className = '';
        windIcon.className = '';
        rainIcon.className = '';
        pressureIcon.className = '';
        countryCodeIcon.className = '';

        // Clear weather-related paragraphs
        const weatherParagraphs = [
          document.querySelector('.weather-details .humidity p'),
          document.querySelector('.weather-details .feels-like p'),
          document.querySelector('.weather-details .wind p'),
          document.querySelector('.weather-details .rain p'),
          document.querySelector('.weather-details .pressure p'),
          document.querySelector('.weather-details .country-code p')
        ];

        weatherParagraphs.forEach(paragraph => {
          paragraph.innerHTML = '';
        });

        // Clear news-related elements
        const newsElement = document.querySelector('.news');
        newsElement.innerHTML = '';

        // Clear exchange rates-related elements
        const exchangeRatesElement = document.querySelector('.exchange-rates');
        exchangeRatesElement.innerHTML = '';

      }


    } catch (error) {
      console.error('Error:', error);
    }
  });
});
