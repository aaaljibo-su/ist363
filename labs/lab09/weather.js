document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=43.0481&longitude=-76.1474&current=temperature_2m,precipitation,cloud_cover&temperature_unit=fahrenheit&precipitation_unit=inch";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherData = data.current;
            const precipitation = weatherData.precipitation;
            const temperature = weatherData.temperature_2m;
            const cloudCover = weatherData.cloud_cover;

            // emoji
            const emoji = cloudCover > 50 ? "☁️" : "☀️";

            // weather box
            const weatherBox = document.querySelector(".weather .row");

            weatherBox.innerHTML = `
                <div class="col-md-6">
                    Precipitation: ${precipitation}"<br>
                    Temperature: ${temperature}°F
                </div>
                <div class="col-md-6 emoj">${emoji}</div>
            `;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
});
