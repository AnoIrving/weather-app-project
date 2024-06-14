function updateCurrentWeather(response) {
  let currentTemp = Math.round(response.data.temperature.current);
  let currentTempElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  currentTempElement.innerHTML = currentTemp;
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
