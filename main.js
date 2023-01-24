const key = config.API_KEY;

const submitButton = document.querySelector(".submit-button");
const weatherResultsDiv = document.querySelector(".weather-results");

const limit = 1;

function getWeather(location) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${limit}&appid=${config.API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lat = data[0].lat;
      lon = data[0].lon;
      return [lat, lon];
    })
    .then(function (coords) {
      coords = { lat, lon };
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${config.API_KEY}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          displayWeather(data);
          return data;
        });
    });
}

function displayWeather(data) {
  const city = data.name;
  const weatherDescription = data.weather[0].description;
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;

  const cityP = document.createElement("p");
  const tempP = document.createElement("p");
  const weatherDescP = document.createElement("p");
  cityP.innerHTML = data.name;
  tempP.innerHTML = `${data.main.temp} °F`;
  weatherDescP.innerHTML = data.weather[0].description;

  weatherResultsDiv.appendChild(cityP);
  weatherResultsDiv.appendChild(tempP);
  weatherResultsDiv.appendChild(weatherDescP);

  // cityP.innerHTML = `It's currently ${weatherDescription} in ${city}. The temperature is ${temp} but it feels like ${feelsLike}.`;
  // weatherResultsDiv.appendChild(cityP);
}

submitButton.addEventListener("click", function (e) {
  const searchedString = e.target.previousElementSibling.value;
  getWeather(searchedString);
});
