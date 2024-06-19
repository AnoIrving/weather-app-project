function updateCurrentWeather(response) {
  let currentTempElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let conditionsElement = document.querySelector("#conditions");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let heatIndexElement = document.querySelector("#heat-index");
  let dateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let apiIconUrl = response.data.condition.icon;
  let customIcon = iconMapping[apiIconUrl];

  iconElement.innerHTML = displayWeatherIcon(customIcon);
  dateElement.innerHTML = currentDate(date);
  heatIndexElement.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°F`;
  windElement.innerHTML = `${response.data.wind.speed} mph`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  conditionsElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  currentTempElement.innerHTML = Math.round(response.data.temperature.current);
}

function displayWeatherIcon(customIcon) {
  return `<img src="${customIcon}" class="current-temp-icon"/>`;
}

let iconMapping = {
  "clear-sky-day": "vampire-icons/custom-clear-sky-day.png",
  "clear-sky-night": "vampire-icons/custom-clear-sky-night.png",
  "few-clouds-day": "vampire-icons/custom-few-clouds.png",
  "few-clouds-night": "vampire-icons/custom-few-clouds.png",
  "scattered-clouds-day": "vampire-icons/custom-scattered-clouds.png",
  "scattered-clouds-night": "vampire-icons/custom-scattered-clouds.png",
  "broken-clouds-day": "vampire-icons/custom-broken-clouds.png",
  "broken-clouds-night": "vampire-icons/custom-broken-clouds.png",
  "shower-rain-day": "vampire-icons/custom-shower-rain.png",
  "shower-rain-night": "vampire-icons/custom-shower-rain.png",
  "rain-day": "vampire-icons/custom-shower-rain.png",
  "rain-night": "vampire-icons/custom-shower-rain.png",
  "thunderstorm-day": "vampire-icons/custom-thunderstom.png",
  "thunderstorm-night": "vampire-icons/custom-thunderstom.png",
  "snow-day": "vampire-icons/custom-snow.png",
  "snow-night": "vampire-icons/custom-snow.png",
  "mist-day": "vampire-icons/custom-mist.png",
  "mist-night": "vampire-icons/custom-mist.png",
};

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
   
    <img src="vampire-icons/custom-shower-rain.png" alt="" width="42" class="forecast-icon"/>
    
    <div class="col-2">
    <div class="forecast-day">${day}</div>
    <div class="forecast-temp">
    <span class="forecast-temp-high">95°</span>
    <span class="forecast-temp-low">78°</span>
    </div>
    </div>
    `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();

function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `<span class="tint">${day}</span> <strong>${hours}:${minutes}</strong>`;
}

function searchCity(city) {
  let apiKey = "86c4028fc5a4ecb6d0b3otf13026c027";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateCurrentWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Houston");
