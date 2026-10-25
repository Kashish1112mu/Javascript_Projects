const city = document.querySelector("#city")
const result = document.querySelector("#result")
const buttonsearch = document.querySelector("#buttonsearch")
const weather = document.querySelector("#weather")
console.log(city);
console.log(result);
console.log(buttonsearch);

buttonsearch.addEventListener("click", function () {
    const ans = city.value;

    console.log("Search clicked");

    if (ans == "") {
        // .style.color="Red";
        alert("Enter the city mannn!")
        console.log("Please enter the city");
    }
    else {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${ans}&count=5`;


        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.results && data.results.length > 0) {
                    const location = data.results[0];
                    result.innerHTML = "Weather in " + location.name;
                    const latitude = location.latitude;
                    const longitude = location.longitude;
                    console.log(latitude);
                    console.log(longitude);

                    const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude="
                        + latitude
                        + "&longitude="
                        + longitude
                        + "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code";

                    console.log(weatherURL);

                    fetch(weatherURL)
                        .then(function (response) {
                            return response.json();
                        })

                        .then(function (data) {

                            console.log(data);
                            const temperature = data.current.temperature_2m;
                            const humidity = data.current.relative_humidity_2m;
                            const feelsLike = data.current.apparent_temperature;
                            const weatherCode = data.current.weather_code;;

                            console.log(temperature);
                            console.log(humidity);
                            console.log(feelsLike);
                            console.log(weatherCode);

                            weather.innerHTML =
                                "<h2>" + temperature + " °C</h2>" +
                                "<p>Humidity: " + humidity + "%</p>" +
                                "<p>Feels like: " + feelsLike + " °C</p>" +
                                "<p>Weather code: " + weatherCode + "</p>";
                        })
                        .catch(function (error) {
                            console.log("Error fetching weather:", error);
                            weather.innerHTML = "Unable to fetch weather. Please try again.";
                        });



                }
                else {
                    result.innerHTML = "Not found";
                    console.log("City not found,Please try again");
                }


            });

    }

});