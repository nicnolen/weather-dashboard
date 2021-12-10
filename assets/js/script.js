// GLOBAL VARIABLES
// Reference the form
var userFormEl = document.getElementById('city-form');
// Reference the input box
var userInputEl = document.getElementById('city-input');
// Reference to the <h2> that will store the city the user inputted
var citySearchInputEl = document.getElementById('searched-city');
// Reference the container where the weather info will be stored
var currentWeatherEl = document.getElementById('current-weather-container');
// Reference to the five day forecast container
var forecastContainerEl = document.getElementById('forecast-container');
// Reference to the title of the five day forecas
var forecastTitleEl = document.getElementById('forecast-title');
// Reference the submit button
var pastSearchBtnEl = document.getElementById('past-search-btn');

// Empty array to store the cities the user inputs
var cities = [];

// FUNCTIONS
// Function when user submits form
var formSubmitHandler = function (event) {
  // stop the form from submitting and reloading the page
  event.preventDefault();
  // Reference the users input value
  var inputVal = userInputEl.value.trim();

  // If the user did input a city
  if (inputVal) {
    // get the current weather and 5 day forecasts
    currentWeather(inputVal);
    // fiveDayForecast(inputVal);
    // Add the new value to the beginning (.unshift) of the cities array
    cities.unshift({ inputVal });
    // clear the city the user input
    userInputEl.value = '';
  } else {
    alert('Please enter a city');
  }

  // // save the cities array to local storage
  // saveCity();
  // // create a new button for the searched city
  // pastSearch(inputVal);
};

var currentWeather = function (city) {
  // Reference your API key. The API  is your unique id associated with your OpenWeatherMap account
  var apiKey = `164ca084a373d5791ba7dbbc5cff2467`;
  // define the OpenWeatherMap API URL
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      // displayWeather(data, city);
    });
  });
};
// // Function to display current weather
// var currentWeather = function (weather) {
//   // grab the current weather data
//   // pass the OpenWeatherMap URL to the fetch method to access the url
//   // the fetch() method returns a promise containing the response object (response parameter)
//   fetch(apiUrl).then(function (response) {
//     // request as successful (.ok)
//     if (response.ok) {
//       console.log(response);
//       // to make the data (data parameter) useful, convert it to a JSON format using .json()
//       response
//         .json()
//         .then(function (data) {
//           console.log(data.items, weather);
//         })
//         // request was unsuccessful
//         .catch(function () {
//           alert('Please search for a valid city');
//         });
//     }
//   });
// };
// currentWeather();

// // Function to display 5 day weather forecast
// var fiveDayForecast = function () {
//   console.log('future weather');
// };
// fiveDayForecast();

// CLICK EVENTS
// Search button click event to save city
userFormEl.addEventListener('submit', formSubmitHandler);
// searchBtnEl.addEventListener('click' buttonClickHandler);
