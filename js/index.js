document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector("#cityInput");
  const button = document.querySelector("#Btn");
  const weatherDataContainer = document.getElementById("weatherData");

  async function submitButton(event) {
    event.preventDefault();
  
    const inputValue = input.value;
    const apiKey = "597c40c39084687093b091cd48b366f8";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (response.ok) {
        updateWeatherUI(data);
      } else {
        handleErrorResponse(data);
      }
    } catch (error) {
      handleError(error);
    }
  }
  
  function updateWeatherUI(data) {
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  
    document.querySelector(".icon").src = iconUrl;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "℃";
    document.querySelector(".weatherDescription").innerHTML = `Weather: ${data.weather[0].description}`;
    document.querySelector(".wind").innerHTML = `Wind: ${data.wind.speed} km/h`;
  }
  
  function handleErrorResponse(data) {
    weatherDataContainer.innerHTML = `<p>Error: ${data.message}</p>`;
  }
  
  function handleError(error) {
    weatherDataContainer.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
  }
  
  button.addEventListener("click", submitButton);
});
