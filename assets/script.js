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

// setting the historical searches. If there is something in local storage then the variable will be set to it. If not, then it will be set to blank.

var historyCheck = localStorage.getItem("searchHistory");
if (!historyCheck){
var history = [];
}
else {
    var history = [];
    history = JSON.parse(historyCheck);
}

if (history.length >= 1) {
    
    for (let i=0; i < history.length; i++) {
        var initButtonList = $("<button>");
        initButtonList.addClass("init-button btn btn-secondary w-100 my-2");
        initButtonList.text(history[i]);
        pastSearches.append(initButtonList);
    }
}
var initButton = $(".init-button"); //Just created the buttons from the localStorage and now grabbing them. They are updated at the end of the file.

// grabbing the forecast days

var day1 = $("#day-1");
var day2 = $("#day-2");
var day3 = $("#day-3");
var day4 = $("#day-4");
var day5 = $("#day-5");

function createButton(selectedCity) {
    // this fuction will be used to create a button which can be pressed and searched again.
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
    console.log(searchHistory);
    console.log($.inArray(selectedCity,searchHistory));
    var cityButton = $("<button>");
    var arrayLength = history.length;

    if ($.inArray(selectedCity,searchHistory) == -1) {
        console.log(cityButton);
        cityButton.text(selectedCity);
        cityButton.addClass("btn btn-secondary w-100 my-2");
        pastSearches.append(cityButton);
        history.push(selectedCity);
        console.log(history);
        localStorage.setItem("searchHistory",JSON.stringify(history));
    }

    cityButton.click(function() {
        var newCity = cityButton.text();
        getQuery(newCity);
        cityDisplayEl.text(newCity + " " + CURRENTDAY);
    });

}

function displayForecast(secondApiCallData){
    var uvData = secondApiCallData.current.uvi;
    console.log(uvData);
    console.log(typeof uvData);
    uvOutput.text(uvData);
    uvOutput.removeClass();

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
        var futImage = secondApiCallData.daily[i].weather[0].main;
        console.log(futImage);

        
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

        var weatherImg = $("<img>");
        // weatherImg.attr("height", "30");
        // weatherImg.attr("width", "30");
        if (futImage === "Clear") {
            weatherImg.attr("src", "./assets/images/clear_img.png");
        }
        else if (futImage === "Rain" || futImage === "Drizzle") {
            weatherImg.attr("src", "./assets/images/rain_img.png");
        }
        else if (futImage === "Snow") {
            weatherImg.attr("src", "./assets/images/snow_img.png")
        }
        else if (futImage === "Clouds") {
            weatherImg.attr("src", "./assets/images/clouds_img.png")
        }
        else if (futImage === "Thunderstorm") {
            weatherImg.attr("src", "./assets/images/tstorm_img.png")
        }
        else {
            weatherImg.attr("src", "./assets/images/else_img.png")
        }
        daySelect.append(weatherImg);
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
    cityInputEl.val("");
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

function getQuery(selectedCity) {
    event.preventDefault(); //event is crossed out but it's still needed

    // clearing out the forecast data so it doesn't duplicate. If you select multiple cities in one sitting.
    day1.text("");
    day2.text("");
    day3.text("");
    day4.text("");
    day5.text("");

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

cityFormEl.on("submit", function(){
    var selectedCity = cityInputEl.val().trim();
    getQuery(selectedCity);
    cityDisplayEl.text(cityInputEl.val() + " " + CURRENTDAY);
});

initButton.on("click", function(){
    var cityName = $(this).text();
    getQuery(cityName);
    cityDisplayEl.text(cityName + " " + CURRENTDAY);
})

})