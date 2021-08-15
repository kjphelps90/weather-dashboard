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
var pastSearches = $("#past-searches");

// grabbing the forecast days

var day1 = $("#day-1");
var day2 = $("#day-2");
var day3 = $("#day-3");
var day4 = $("#day-4");
var day5 = $("#day-5");

function createButton(selectedCity) {
    // this fuction will be used to create a button which can be pressed and searched again.

    var cityButton = $("<button>");
    console.log(cityButton);
    cityButton.text(selectedCity);
    cityButton.addClass("btn btn-secondary w-100 my-2");
    pastSearches.append(cityButton);

    cityButton.click(function() {
        alert("this is working.");
    });

}

function displayForecast(secondApiCallData){
    var uvData = secondApiCallData.current.uvi;
    console.log(uvData);
    console.log(typeof uvData);
    uvOutput.text(uvData);

    if (uvData == 0 || uvData <= 3) {
        uvOutput.addClass("uv-low");
    }
    else if (uvData > 3 && uvData <= 5){
        uvOutput.addClass("uv-moderate");
    }
    else if (uvData > 5 && uvData <= 7){
        uvOutput.addClass("uv-high");
    }
    else if (uvData > 7 && uvData <= 10){
        uvOutput.addClass("uv-veryhigh");
    }
    else {
        uvOutput.addClass("uv-extreme");
    }

    // Have to create the 5 day forecast.



    for (let i=1; i<6; i++) {

        var daySelect = eval("day" + i);
        // console.log(daySelect);
        // console.log(typeof daySelect);

        var date = moment().add(i,"days").format("M/D/YYYY");
        var futTemp = secondApiCallData.daily[i].temp.day;
        // console.log(futTemp);
        var futWind = secondApiCallData.daily[i].wind_speed;
        var futHumid = secondApiCallData.daily[i].humidity;

        
        var futureDate = $("<li>");
        futureDate.text(date);
        // console.log(futureDate);
        daySelect.append(futureDate);

        var forecastTemp = $("<li>");
        forecastTemp.text("Temp: " + futTemp + "℉");
        // console.log(forecastTemp);
        daySelect.append(forecastTemp);

        var forecastWind = $("<li>");
        forecastWind.text("Wind: " + futWind + " MPH");
        daySelect.append(forecastWind);

        var forecastHumid = $("<li>");
        forecastHumid.text("Humidity: " + futHumid + "%");
        daySelect.append(forecastHumid);

        // can add images in there as well if time permits.  
    }



}

function secondApiCall(latitude, longitude) {
    var secondCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + APIKEY;
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

    // clearing out the forecast data so it doesn't duplicate. If you select multiple cities in one sitting.
    day1.text("");
    day2.text("");
    day3.text("");
    day4.text("");
    day5.text("");

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
           console.log(response.ok);
           return response.json();
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