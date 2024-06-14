function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query={query}&key={key}";

let apiKey = "86c4028fc5a4ecb6d0b3otf13026c027";
