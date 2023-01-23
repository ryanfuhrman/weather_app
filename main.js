const searchBar = document.querySelector(".weather-search");
const submitButton = document.querySelector(".submit-button");

const lat = 30.438255;
const lon = -84.280731;
const API_KEY = "b2bba0475c02f5de860572c6e8d6f9b2";
const city = "toledo";
const stateCode = "";
const countryCode = "";
const limit = 2;

function getWeather(location) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location},${stateCode},${countryCode}&limit=${limit}&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

submitButton.addEventListener("click", function (e) {
  const searchedString = e.target.previousElementSibling.value;
  getWeather(searchedString);
});
