document.addEventListener('DOMContentLoaded', () => {
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.notfound');

search.addEventListener('click', () => {
    const APIKey = 'a619cfe400134605a12123121240608';
    const city = document.querySelector('.search-box input').value;
    const APIUrl = `http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${encodeURIComponent(city)}`;
    
    if (city === '') return;

    fetch(APIUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netware error');
            }
            return response.json();
        })
        .then(json => {
            if (json.error && json.error.code === '1006') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error.style.display = 'block';
                error.classList.add('fadeIn');
                return;
            }
            console.log(json); 
            error.style.display = 'none';
            error.classList.remove('fadeOut');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            switch (json.current.condition.text) {
                case 'Sunny':
                    image.src = 'images/clear.png';
                    break;
                case 'Partly cloudy':
                    image.src = 'images/clouds.png';
                    break;
                case 'Overcast':
                    image.src = 'images/drizzle.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                case 'Light rain':
                    image.src = 'images/clouds.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.textContent = `${json.current.temp_c}°C`;
            description.textContent = json.current.condition.text;
            humidity.textContent = `${json.current.humidity}%`;
            wind.textContent = `${json.current.wind_kph} km/h`;

            container.style.height = '600px';
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });
});
