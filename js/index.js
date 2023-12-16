document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector("#cityInput");
  const button = document.querySelector("#Btn");
  const weatherDataContainers = document.getElementsByClassName("container");

  // Assuming there is only one element with the class "container"
  const weatherDataContainer = weatherDataContainers[0];

  const apiKey = "597c40c39084687093b091cd48b366f8";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  async function submitButton(event) {
    event.preventDefault();
    const inputValue = input.value;
    const params = new URLSearchParams({
      q: inputValue,
      appid: apiKey,
      units: "metric",
    });

    try {
      const response = await fetch(`${apiUrl}?${params}`);
      const data = await response.json();

      if (response.ok) {
        resetError(); // Reset error message before updating UI
        updateWeatherUI(data);
      } else {
        handleErrorResponse(data);
      }
    } catch (error) {
      handleError(error);
    }
  }

  function updateWeatherUI(data) {
    const { icon, name, main, weather, wind } = data;
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
    const backgroundImageUrl = getBackgroundImageUrl(weather[0].description);

    // Reset error message before updating UI
    resetError();

    document.querySelector(".icon").src = iconUrl;
    document.querySelector(".city").innerHTML = name;
    document.querySelector(".temp").innerHTML = `${Math.round(main.temp)}℃`;
    document.querySelector(
      ".weatherDescription"
    ).innerHTML = `Weather: ${weather[0].description}`;
    document.querySelector(".wind").innerHTML = `Wind: ${wind.speed} km/h`;

    weatherDataContainer.style.backgroundImage = `url(${backgroundImageUrl})`;
  }

  function resetError() {
    const existingErrorMessages = document.querySelectorAll(".error-message");
    existingErrorMessages.forEach((element) => element.remove());
  }

  // here you can select keywords and the images to be displayed based on the words in the fetched data, add more like snow etc

  function getBackgroundImageUrl(weatherDescription) {
    const images = {
      clear: "../assets/clear.jpg",
      sun: "../assets/sunny.jpg",
      rain: "../assets/water.jpg",
      cloud: "../assets/cloudy.jpg",
      haze: "../assets/cloudy.jpg",
    };

    const defaultImage = "";

    const matchingKeyword = Object.keys(images).find((keyword) =>
      weatherDescription.toLowerCase().includes(keyword)
    );

    return images[matchingKeyword] || defaultImage;
  }

  function handleErrorResponse(data) {
    const errorMessageElement = document.createElement("p");
    errorMessageElement.textContent = `Error: ${data.message}`;
    errorMessageElement.classList.add("error-message");

    weatherDataContainer.appendChild(errorMessageElement);
  }

  function handleError(error) {
    const errorMessageElement = document.createElement("p");
    errorMessageElement.textContent = `Error fetching weather data: ${error.message}`;
    errorMessageElement.classList.add("error-message");

    weatherDataContainer.appendChild(errorMessageElement);
  }

  button.addEventListener("click", submitButton);
});
