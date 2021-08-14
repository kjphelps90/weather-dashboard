$(document).ready(function () {

// grab ids that will be updated when the fucntion is run.
    // -don't need to grab the button because it's apart of the form
var CURRENTDAY = moment().format("(MM/DD/YYYY)");
var APIKEY = "75f8ef327e7ac7bfe860832fbe2eb2d0";
var cityFormEl = $("#city-name");
var cityInputEl = $("#city-input");
var cityDisplayEl = $("#city-display");
var tempOutput = $("#temp-output");
var windOutput = $("#wind-output");
var humidityOutput = $("#humidity-output");
var uvOutput = $("#uv-output");

function createButton(selectedCity) {
    // this fuction will be used to create a button which can be pressed and searched again.
}

function displayForecast(data){

}

function secondApiCall(latitude, longitude) {
    var secondCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=current,minutely,hourly,alerts&appid=" + APIKEY;
    console.log(secondApiCall);

    fetch(secondCall)
    .then(function(response){
        console.log(response);
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(data){
        console.log(data);
        displayForecast(data);
    })
    .catch(function(err){
        console.log(err);
    })
}

function displayWeather(firstApiCallData) {
    cityDisplayEl.text(cityInputEl.val() + " " + CURRENTDAY);

    var temp = firstApiCallData.main.temp;
    var wind = firstApiCallData.wind.speed;
    var humidity = firstApiCallData.main.humidity;
    console.log(temp);
    console.log(wind);
    console.log(humidity);

    tempOutput.text("Temp: " + temp + "℉");
    windOutput.text("Wind: " + wind + " MPH");
    humidityOutput.text("Humidity: " + humidity + " %");
    console.log(tempOutput);
    console.log(windOutput);
    console.log(humidityOutput);

    var latitude = firstApiCallData.coord.lat;
    var longitude = firstApiCallData.coord.lon;
    console.log(latitude);
    console.log(longitude);

    secondApiCall(latitude,longitude);
}

function getQuery(event) {
    event.preventDefault();

    var selectedCity = cityInputEl.val().trim();
    console.log(selectedCity);

    if (!selectedCity) {
        alert("Please enter the name of a city");
        return;
    }

    createButton(selectedCity);

    var firstApiQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + selectedCity + "&appid=" + APIKEY + "&units=imperial";
    console.log(firstApiQuery);

    fetch(firstApiQuery)
    .then(function(response){
        if (response.ok) {
           console.log(response);
           return response.json();
        }
        else {
            cityDisplayEl.text("City not found, try again");
            return;
        }
    })
    .then(function(data){
        console.log(data);
        displayWeather(data);
    })
    .catch(function(err){
        console.log(err);
    })
}

cityFormEl.on("submit", getQuery);



// function that creates a button when the city has been searched for
    // if city is valid then create button and append below the     search box
        // cities should not be duplicated (if possible).
    // button should have an a tag that triggers the API. ($(this))
    // Selecting the buttons below will not create another button below.


// function that calls the weather api based on the city that is being searched.
    // variables will have to be created based on the return data of the API(s) and then set.
    // boxes will have to be created that get shown in the 5 day forecast with date, image (possibly), temp, wind, and humidity.









})