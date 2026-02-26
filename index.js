const apiKey = "0e89d19abf69d538bb82ef5bea4dbda3";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const errorMessage = document.getElementById("errorMessage");
const loading = document.getElementById("loading");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    fetchWeather(city);
});

async function fetchWeather(city) {

    if (!city) {
        errorMessage.textContent = "Please enter a city name.";
        weatherResult.innerHTML = "";
        return;
    }

    errorMessage.textContent = "";
    weatherResult.innerHTML = "";
    loading.style.display = "block";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {
        errorMessage.textContent = error.message;
    } finally {
        loading.style.display = "none";
    }
}

function displayWeather(data) {
    weatherResult.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}