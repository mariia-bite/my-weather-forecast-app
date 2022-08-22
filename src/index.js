let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let h3 = document.querySelector("h3");
h3.innerHTML = `${day}, ${hours}:${minutes}`;

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#today-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let icon = document.querySelector("#main-emoji");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function searchCity(city) {
  let apiKey = "037ebf292d4ad4957bb230ad97acdefe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "037ebf292d4ad4957bb230ad97acdefe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");

//converter
function convertToFarenheit(event) {
  event.preventDefault();

  let convertedResultFarenheit = document.querySelector("#today-temperature");
  convertedResultFarenheit.innerHTML = "91";
}
let farenheitConverter = document.querySelector("#farenheit");
farenheitConverter.addEventListener("click", convertToFarenheit);

function convertToCelsius(event) {
  event.preventDefault();

  let convertedResultCelsius = document.querySelector("#today-temperature");
  convertedResultCelsius.innerHTML = 33;
}
let celsiusConverter = document.querySelector("#celsius");
celsiusConverter.addEventListener("click", convertToCelsius);
