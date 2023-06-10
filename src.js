function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let hours = date.getHours();
  let amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month = months[date.getMonth()];
  let day = days[date.getDay()];
  let dates = date.getDate();
  return `${day}, ${month} ${dates}, ${hours}:${minutes} ${amPm}`;
}

// Forecast Timestamp
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// Search for a city input form for current weather conditions
function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "e36b54b1d58e58429f0670652c731a60";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?&query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityInput);

// Weather Function Response
function showWeather(response) {
  console.log(response);
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature-now").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.time * 1000
  );
  getForecast(response.data.coordinates);
  displayFahrenheitTemperature({ preventDefault: function () {} });
}

// Search with GPS Latitude and Longitude (Allow location search)
function searchLocation(position) {
  let apiKey = "e36b54b1d58e58429f0670652c731a60";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?&lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-input");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Forecast Weather
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastWeather = document.querySelector("#full-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
          <div class="forecast-day">${formatDay(forecastDay.time)}</div>
          <img 
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png" width="70" alt="forecast-icon" id="forecast-icon"/>
          <div class="weather-forecast-temperatures">
            <span class="forecast-hi">${Math.round(
              forecastDay.temperature.maximum
            )}°</span> / 
            <span class="forecast-low">${Math.round(
              forecastDay.temperature.minimum
            )}</span>°
          </div>
        </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastWeather.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e36b54b1d58e58429f0670652c731a60";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?&lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Placeholder city upon website launch and reload
searchCity("Milwaukee");

// Top Cities Weather
// Tokyo
function searchTokyo(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?&query=tokyo&key=1bf547ta2a3986bceb80d3bcaob62269&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let tokyoCity = document.querySelector("#tokyo");
tokyoCity.addEventListener("click", searchTokyo);
//
// New York
function searchNewYorkCity(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?&query=new+york+city&key=1bf547ta2a3986bceb80d3bcaob62269&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let newYorkCity = document.querySelector("#new-york");
newYorkCity.addEventListener("click", searchNewYorkCity);
//
// London
function searchLondonCity(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?&query=london&key=1bf547ta2a3986bceb80d3bcaob62269&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let londonCity = document.querySelector("#london");
londonCity.addEventListener("click", searchLondonCity);
//
// Los Angeles
function searchLosAngelesCity(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?&query=los+angeles&key=1bf547ta2a3986bceb80d3bcaob62269&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let losAngelesCity = document.querySelector("#los-angeles");
losAngelesCity.addEventListener("click", searchLosAngelesCity);
//
// Paris
function searchParisCity(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?&query=paris&key=1bf547ta2a3986bceb80d3bcaob62269&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let parisCity = document.querySelector("#paris");
parisCity.addEventListener("click", searchParisCity);
//
// Chicago
function searchTurinCity(event) {
  event.preventDefault();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?&query=chicago&key=1bf547ta2a3986bceb80d3bcaob62269&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let turinCity = document.querySelector("#turin");
turinCity.addEventListener("click", searchTurinCity);
//