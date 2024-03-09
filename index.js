const weatherForm = document.querySelector("form");
const formInput = document.querySelector(".formInput");
const formButton = document.querySelector(".formButton");
const card = document.querySelector(".card");

const block = document.querySelector(".block");
const blockMain = document.querySelector(".blockMain");
const blockSun = document.querySelector(".blockSun");
const blockTemp = document.querySelector(".blockTemp");
const blockAtmospheric = document.querySelector(".blockAtmospheric");

const apiKey = "64a3201dbd0be720718884957e5f1a81";

let currentWeatherData = null;

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
  block.style.display = "none";

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Could not fetch weather data😞");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  currentWeatherData = data;

  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = currentWeatherData;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");
  const detailsDisplay = document.createElement("button");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `Temp: ${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);
  detailsDisplay.textContent = "More details";

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");
  detailsDisplay.classList.add("detailsDisplay");

  detailsDisplay.addEventListener("click", () => showDetailsInfo());

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
  card.appendChild(detailsDisplay);
}

function showDetailsInfo() {
  const {
    name: city,
    timezone,
    dt: unix,
    main: { temp, feels_like, humidity, pressure },
    sys: { sunrise, sunset },
    weather: [{ description }],
    wind: { speed },
  } = currentWeatherData;

  card.style.display = "none";

  blockMain.textContent = "";
  blockSun.textContent = "";
  blockTemp.textContent = "";
  blockAtmospheric.textContent = "";

  block.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const descDisplay = document.createElement("h2");
  const timeDisplay = document.createElement("p");
  const sunriseSvg = document.createElement("img");
  const sunriseDisplay = document.createElement("p");
  const sunsetSvg = document.createElement("img");
  const sunsetDisplay = document.createElement("p");
  const tempDisplay = document.createElement("p");
  const feelsLikeDisplay = document.createElement("p");
  const humiditySvg = document.createElement("img");
  const humidityDisplay = document.createElement("p");
  const pressureSvg = document.createElement("img");
  const pressureDisplay = document.createElement("p");
  const windSvg = document.createElement("img");
  const windDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  descDisplay.textContent = description;
  timeDisplay.textContent = getTime(unix, timezone);
  sunriseSvg.src = "./assets/sunrise-svgrepo-com.svg";
  sunriseDisplay.textContent = getTime(sunrise, timezone);
  sunsetSvg.src = "./assets/sunset-svgrepo-com.svg";
  sunsetDisplay.textContent = getTime(sunset, timezone);
  tempDisplay.textContent = `Temp: ${(temp - 273.15).toFixed(1)}°C`;
  feelsLikeDisplay.textContent = `Feels like: ${(feels_like - 273.15).toFixed(
    1
  )}°C`;
  humiditySvg.src = "./assets/humidity-svgrepo-com.svg";
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  pressureSvg.src = "./assets/pressure-svgrepo-com.svg";
  pressureDisplay.textContent = `Pressure: ${pressure}mbar`;
  windSvg.src = "./assets/wind-svgrepo-com.svg";
  windDisplay.textContent = `Wind speed: ${speed}km/h`;

  blockMain.appendChild(cityDisplay);
  blockMain.appendChild(descDisplay);
  blockMain.appendChild(timeDisplay);

  blockSun.appendChild(sunriseSvg);
  blockSun.appendChild(sunriseDisplay);
  blockSun.appendChild(sunsetSvg);
  blockSun.appendChild(sunsetDisplay);

  blockTemp.appendChild(tempDisplay);
  blockTemp.appendChild(feelsLikeDisplay);

  blockAtmospheric.appendChild(humiditySvg);
  blockAtmospheric.appendChild(humidityDisplay);
  blockAtmospheric.appendChild(pressureSvg);
  blockAtmospheric.appendChild(pressureDisplay);
  blockAtmospheric.appendChild(windSvg);
  blockAtmospheric.appendChild(windDisplay);
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
      card.style.background = block.style.background =
        "linear-gradient(180deg, hsl(220, 100%, 50%), hsl(240, 100%, 50%))";
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      card.style.background = block.style.background =
        "linear-gradient(180deg, hsl(200, 80%, 80%), hsl(210, 100%, 50%))";
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      card.style.background = block.style.background =
        "linear-gradient(180deg, hsl(200, 70%, 60%), hsl(210, 100%, 50%))";
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      card.style.background = block.style.background =
        "linear-gradient(180deg, hsl(200, 20%, 90%), hsl(60, 50%, 95%))";
      return "🌨️";
    case weatherId >= 700 && weatherId < 800:
      card.style.background = block.style.background =
        "linear-gradient(180deg, hsl(200, 60%, 80%), hsl(60, 100%, 90%))";
      return "🌫️";
    case weatherId === 800:
      card.style.background = block.style.background =
        "linear-gradient(180deg,hsl(200, 100%, 70%), hsl(60, 100%, 70%))";
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      card.style.background = block.style.background =
        "linear-gradient(180deg, hsl(200, 20%, 90%), hsl(210, 30%, 80%))";
      return "☁️";
    default:
      return "❓";
  }
}

function getTime(unix, timezone) {
  const time = new Date((unix + timezone) * 1000);
  const hours = time.getUTCHours();
  const minutes =
    time.getUTCMinutes().toString().length === 1
      ? time.getUTCMinutes() + "0"
      : time.getUTCMinutes();
  return `${hours}:${minutes}`;
}
