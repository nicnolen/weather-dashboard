// GLOBAL VARIABLES
// Reference the form
var userFormEl = document.getElementById('city-form');
// Reference the input box
var userInputEl = document.querySelector('.city-input');
// Reference the submit button
var searchBtnEl = document.getElementById('search-btn');
// Reference the container where the weather info will be stored
var weatherInfoEl = document.getElementById('weather-info');

// define the OpenWeatherMap API URL
var apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey)';
// Reference your API key. The API  is your unique id associated with your OpenWeatherMap account
var apiKey = '164ca084a373d5791ba7dbbc5cff2467';

// FUNCTIONS
// Function when user submits form

// Function to display current weather
var currentWeather = function (weather) {
  // grab the current weather data
  // pass the OpenWeatherMap URL to the fetch method to access the url
  // the fetch() method returns a promise containing the response object (response parameter)
  fetch(apiUrl).then(function (response) {
    // request as successful (.ok)
    if (response.ok) {
      console.log(response);
      // to make the data (data parameter) useful, convert it to a JSON format using .json()
      response
        .json()
        .then(function (data) {
          console.log(data.items, weather);
        })
        // request was unsuccessful
        .catch(function () {
          alert('Please search for a valid city');
        });
    }
  });
};
currentWeather();

// Function to display 5 day weather forecast
var futureWeather = function () {
  console.log('future weather');
};
futureWeather();

// CLICK EVENTS
// Search button click event to save city
// userFormEl.addEventListener('submit', formSubmitHandler);
// searchBtnEl.addEventListener('click' buttonClickHandler);
