const apiKey = "";  // OpenWeatherMap API key

document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            weatherInfoDiv.innerHTML = "City not found. Please try again.";
        } else {
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            weatherInfoDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${temp}°C</p>
                <p>Condition: ${description}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;
        }
    } catch (error) {
        weatherInfoDiv.innerHTML = "Error fetching weather data. Please try again.";
        console.error("Error fetching weather data:", error);
    }
}
