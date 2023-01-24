const submitButton = document.querySelector(".submit-button");
const weatherResultsDiv = document.querySelector(".weather-results");

const API_KEY = "b2bba0475c02f5de860572c6e8d6f9b2";
const limit = 1;

function getWeather(location) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${limit}&appid=${API_KEY}`
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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
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
  cityP.innerHTML = `It's currently ${weatherDescription} in ${city}. The temperature is ${temp} but it feels like ${feelsLike}.`;
  weatherResultsDiv.appendChild(cityP);
}

submitButton.addEventListener("click", function (e) {
  const searchedString = e.target.previousElementSibling.value;
  getWeather(searchedString);
});
