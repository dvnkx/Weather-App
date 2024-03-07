const weatherForm = document.querySelector("form");
const formInput = document.querySelector(".formInput");
const formButton = document.querySelector(".formButton");
const card = document.querySelector(".card");

const apiKey = "64a3201dbd0be720718884957e5f1a81";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = formInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please, enter city❗️");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data😞");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, feels_like, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");

  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `Temp: ${(temp - 273.15).toFixed(
    1
  )}°C  🌡️ Feels like : ${(feels_like - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.style.background =
    "linear-gradient(135deg, hsl(210, 20%, 96%), hsl(0, 0%, 83%))";
  card.appendChild(errorDisplay);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      card.style.background =
        "linear-gradient(180deg, hsl(220, 100%, 50%), hsl(240, 100%, 50%))";
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      card.style.background =
        "linear-gradient(180deg, hsl(200, 80%, 80%), hsl(210, 100%, 50%))";
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      card.style.background =
        "linear-gradient(180deg, hsl(200, 70%, 60%), hsl(210, 100%, 50%))";
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      card.style.background =
        "linear-gradient(180deg, hsl(200, 20%, 90%), hsl(60, 50%, 95%))";
      return "🌨️";
    case weatherId >= 700 && weatherId < 800:
      card.style.background =
        "linear-gradient(180deg, hsl(200, 60%, 80%), hsl(60, 100%, 90%))";
      return "🌫️";
    case weatherId === 800:
      card.style.background =
        "linear-gradient(180deg,hsl(200, 100%, 70%), hsl(60, 100%, 70%))";
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      card.style.background =
        "linear-gradient(180deg, hsl(200, 20%, 90%), hsl(210, 30%, 80%))";
      return "☁️";
    default:
      return "❓";
  }
}

function setCardBackground() {}
