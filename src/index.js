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
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temp-icon" /> `;

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

  return `${day} <strong>${hours}:${minutes}</strong>`;
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
