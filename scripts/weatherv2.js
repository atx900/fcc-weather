// fcc local weather challenge implemented in vanilla JavaScript using standard JS 'coding' style

// resources:
// ----------
// fcc weather api pass-through: https://fcc-weather-api.glitch.me/api/current
// skycons: https://rawgithub.com/darkskyapp/skycons/master/skycons.js

var skycons = new Skycons({'color': 'orange'})                                // initialize skycons library settings
skycons.play()

var placeholderTemp = ''                                                      // temporarily stores temperature data

if (navigator.geolocation) {                                                  // check for geolocation browser support
  navigator.geolocation.getCurrentPosition(getData)                           // retrieve current location: latitude & longitude
} else {
  window.alert('This browser does not support Geolocation')
}

function getData (position) {                                                 // get current weather data based on location
  var currentLatitude = (position.coords.latitude).toFixed(2)
  var currentLongitude = (position.coords.longitude).toFixed(2)
  var apiURL = 'https://fcc-weather-api.glitch.me/api/current?lat=' + currentLatitude + '&lon=' + currentLongitude
  var xhr = new XMLHttpRequest()

  xhr.open('GET', apiURL, true)

  xhr.onload = function () {
    if (this.status === 200) {
      var weatherData = JSON.parse(this.responseText)

      var currentLocation = weatherData.name
      var currentCountry = weatherData.sys.country
      var currentWeather = weatherData.weather[0].main
      var weatherDescription = weatherData.weather[0].description
      var currentTemperature = weatherData.main.temp.toFixed(1)

      placeholderTemp = currentTemperature

      if (currentWeather.indexOf('Clear') >= 0) {                             // retrieve corresponding animted weather icon
        skycons.add(document.getElementById('weather-icon'), Skycons.CLEAR_DAY)
      } else if (currentWeather.indexOf('Clouds') >= 0) {
        skycons.add(document.getElementById('weather-icon'), Skycons.CLOUDY)
      } else if (currentWeather.indexOf('Drizzle') >= 0) {
        skycons.add(document.getElementById('weather-icon'), Skycons.RAIN)
      } else if (currentWeather.indexOf('Mist') >= 0) {
        skycons.add(document.getElementById('weather-icon'), Skycons.RAIN)
      } else if (currentWeather.indexOf('Rain') >= 0) {
        skycons.add(document.getElementById('weather-icon'), Skycons.RAIN)
      } else if (currentWeather.indexOf('Snow') >= 0) {
        skycons.add(document.getElementById('weather-icon'), Skycons.SNOW)
      } else if (currentWeather.indexOf('Thuderstorm') >= 0) {
        skycons.add(document.getElementById('weather-icon'), Skycons.RAIN)
      }

      document.getElementById('location').innerHTML = currentLocation + ', ' + currentCountry
      document.getElementById('weather').innerHTML = currentWeather + ', ' + weatherDescription
      document.getElementById('temperature').innerHTML = currentTemperature + ' Celsius'
      document.getElementById('getFarenheit').addEventListener('click', getTempF)
      document.getElementById('getCelsius').addEventListener('click', getTempC)
    } else {
      window.alert('Problem: Access to FCC Weather API')
    }
  }
  xhr.send()                                                                  // send AJAX 'GET' request to FCC weather API
}

function getTempF () {                                                        // display current temperature in Farenheit
  var temperatureFarenheit = (1.8 * placeholderTemp + 32)
  document.getElementById('temperature').innerHTML = temperatureFarenheit + ' Farenheit'
}

function getTempC () {                                                        // display current temperature in Celsius
  var temperatureCelsius = placeholderTemp
  document.getElementById('temperature').innerHTML = temperatureCelsius + ' Celsius'
}
