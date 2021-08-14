$(document).ready(function () {

// grab ids that will be updated when the fucntion is run.
    // -don't need to grab the button because it's apart of the form


var cityFormEl = $("#city-name");
var cityInputEl = $("#city-input");

function createButton(selectedCity) {
    // this fuction will be used to create a button which can be pressed and searched again.
}

function getQuery(event) {
    event.preventDefault();

    var selectedCity = cityInputEl.val().trim();
    console.log(selectedCity);

    function createButton(selectedCity);


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