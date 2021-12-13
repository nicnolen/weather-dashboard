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
  // grab the value in the input field (.value) and remove whitespace (.trim)
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
    alert('Please search for a valid city');
  }

  // // save the cities array to local storage
  // saveCity();
  // // create a new button for the searched city
  // pastSearch(inputVal);
};

// Grab the current weather data
var currentWeather = function (city) {
  // Reference your API key. The API  is your unique id associated with your OpenWeatherMap account
  var apiKey = `164ca084a373d5791ba7dbbc5cff2467`;
  // define the OpenWeatherMap API URL. Query string starts at `?`. Units=imperial displays the temperature in F
  var currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  // pass the API's URL to the fetch method to return a promise containing a response object
  fetch(currentUrl).then(function (response) {
    // put the desired data (data) into json format(json()) to get a response we can use.
    // this returns another promise which, when fulfilled, will let the data be available for manipulation
    response.json().then(function (data) {
      displayCurrentWeather(data, city);
    });
  });
};

// Function to display current weather
var displayCurrentWeather = function (weather, searchCity) {
  // clear old content
  currentWeatherEl.textContent = '';
  citySearchInputEl.textContent = searchCity;

  // create date element using moments.js. Use span to make it inline
  var currentDate = document.createElement('span');
  // set text content using moments.js
  currentDate.textContent = ' (' + moment(weather.dt.value).format('L') + ') ';
  citySearchInputEl.appendChild(currentDate);

  // create an image element
  var weatherIcon = document.createElement('img');
  // set the source
  weatherIcon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  );
  // append to city search input
  citySearchInputEl.appendChild(weatherIcon);

  // create a span element to hold temperature data
  var temperatureEl = document.createElement('span');
  // set the text content
  temperatureEl.textContent = 'Temperature: ' + weather.main.temp + '°F';
  // set class list
  temperatureEl.classList = 'list-group-item';
  // append to city search input
  citySearchInputEl.appendChild(temperatureEl);

  // create a span element for humidity
  var humidityEl = document.createElement('span');
  // set the text content
  humidityEl.textContent = 'Humidity: ' + weather.main.humidity + '%';
  // set the class
  humidityEl.classList = 'list-group-item';
  // append to city search input
  citySearchInputEl.appendChild(humidityEl);

  // create a span element for wind speed
  var windSpeedEl = document.createElement('span');
  // set text content
  windSpeedEl.textContent = 'Wind Speed: ' + weather.wind.speed + 'MPH';
  // set the class
  windSpeedEl.classList = 'list-group-item';
  // append to city search input
  citySearchInputEl.appendChild(windSpeedEl);

  // define latitude and longitude for UV index
  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  // call the function to get the uv index
  getUvIndex(lat, lon);
  fiveDay(lat, lon);
};

// function to get the uv index
var getUvIndex = function (lat, lon) {
  // Reference your API key
  var apiKey = `164ca084a373d5791ba7dbbc5cff2467`;
  // reference the api URL
  var curUvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  // fetch the API data
  fetch(curUvUrl).then(function (response) {
    // convert response to json
    response.json().then(function (data) {
      // displayUvIndex(data)
      displayUvIndex(data);
    });
  });
};

// Function to display the UV index
var displayUvIndex = function (index) {
  // define the uv index
  var uvi = index.current.uvi;

  // create a div to store the uv index value. Need this for spacing
  var uvContainer = document.createElement('div');
  // add text content
  uvContainer.textContent = 'UV Index: ';
  // add class list
  uvContainer.classList = 'list-group-item';

  // create a span element for the uv index value
  var uvIndexEl = document.createElement('span');
  uvIndexEl.textContent = uvi;

  // apply UV colors based on if uvi is favorable (1-2), moderate (2-7) or severe (>7)
  if (uvi < 2) {
    uvIndexEl.classList = 'favorable';
  } else if (uvi > 2 && uvi < 7) {
    uvIndexEl.classList = 'moderate';
  } else {
    uvIndexEl.classList = 'severe';
  }

  uvContainer.appendChild(uvIndexEl);
  // append to the citySearchInput container
  citySearchInputEl.appendChild(uvContainer);
};

// Grab the 5 day weather forecast
var fiveDay = function (lat, lon) {
  // Reference your API key
  var apiKey = `164ca084a373d5791ba7dbbc5cff2467`;
  // reference the api URL
  var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  // fetch the API data
  fetch(forecastUrl).then(function (response) {
    // convert response to json
    response.json().then(function (data) {
      // displayUvIndex(data)
      displayFiveDay(data);
      console.log(data);
    });
  });
};

// Function to display 5 day weather forecast
var displayFiveDay = function (forecast) {
  // clear old content
  forecastContainerEl.textContent = '';
  forecastTitleEl.textContent = '5-Day Forecast:';

  // make a loop for the 5 day forecast
  for (var i = 0; i < 5; i++) {
    // variable to get daily forecasts by iterating through the weather conditions array
    var dailyForecast = forecast.daily[i];

    // make a container to hold the forcast values
    var forecastDataEl = document.createElement('div');

    // create a date element. Use an `<h4> to make it larger.
    var forecastDate = document.createElement('h4');
    // create the date using moment.js. .unix describes a specific point in time
    forecastDate.textContent = moment.unix(dailyForecast.dt).format('L');
    // append to the forecast data container
    forecastDataEl.appendChild(forecastDate);

    // append the data to its container
    forecastContainerEl.appendChild(forecastDataEl);
  }
};
// CLICK EVENTS
// Search button click event to save city
userFormEl.addEventListener('submit', formSubmitHandler);
// searchBtnEl.addEventListener('click' buttonClickHandler);
