const baseUrl = "http://api.weatherapi.com/v1"
const key = "bd78ac7fb3ea49ec91c111815232412"
let city = "auckland"
let currentURL = `${baseUrl}/current.json?key=${key}&q=${city}&aqi=no`;

function renderWeather(data) {

    const temp = document.getElementById("temp");
    temp.textContent = `${data.current.temp_c}°C`;

    const cond = document.getElementById("cond");
    const condImg = document.getElementById("condimg");
    condImg.src = data.current.condition.icon;
    condImg.style.width = "3rem";
    cond.appendChild(condImg);
    const condtxt = document.getElementById("cond-text");
    condtxt.textContent = data.current.condition.text;

    const name = document.getElementById("city");
    name.textContent = `${data.location.name}, `;
    const country = document.getElementById("country");
    country.textContent = data.location.country;

    const d = data.location.localtime;
    const dateObject = new Date(d);
    // Extract date components
    const year = dateObject.getFullYear();
    const month = dateObject.toLocaleString("default", { month: "short" });
    const day = dateObject.getDate();
    const fullDay = dateObject.toLocaleString("default", { weekday: "long" });

    // Extract time components
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    // Construct the formatted date and time strings
    const formattedDate = `${fullDay}, ${day} ${month} ${year}`;
    const formattedTime = `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;

    const date = document.getElementById("date");
    date.textContent = formattedDate;
    const time = document.getElementById("time");
    time.textContent = formattedTime;

    const feelvalElement = document.getElementById("feelval");
    feelvalElement.textContent = `${data.current.feelslike_c}°C`;
    const rainvalElement = document.getElementById("rainval");
    rainvalElement.textContent = `${data.current.cloud  }%`;
    const windvalElement = document.getElementById("windval");
    windvalElement.textContent = `${data.current.wind_kph}kph`;
    const hvalElement = document.getElementById("hval");
    hvalElement.textContent = `${data.current.humidity}%`;
}



async function getWeatherAPI() {
    try {
        const response = await fetch(currentURL, { mode: "cors" });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        renderWeather(data);
        console.log(data);
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        displayErrorMessage(error.message);
        
        // Automatically remove the error message after 5 seconds (5000 milliseconds)
        setTimeout(() => {
            removeErrorMessage();
        }, 5000);
    }
}

function displayErrorMessage(message) {
    const infoDiv = document.getElementById("info");
    
    // Create an error message element
    const errorMessageElement = document.createElement("div");
    errorMessageElement.className = "error-message";
    errorMessageElement.textContent = "Error: Invalid city name / empty search";

    // Append the error message element to the 'info' div
    infoDiv.appendChild(errorMessageElement);
}

function removeErrorMessage() {
    const infoDiv = document.getElementById("info");
    const errorMessageElement = infoDiv.querySelector(".error-message");

    // Remove the error message element if it exists
    if (errorMessageElement) {
        infoDiv.removeChild(errorMessageElement);
    }
}




getWeatherAPI();


const btn = document.getElementById("searchBtn");
btn.addEventListener("click", ()=>{
    const input = document.getElementById("searchField");
    city = input.value;
    currentURL = `${baseUrl}/current.json?key=${key}&q=${city}&aqi=no`;
    getWeatherAPI();
    renderWeather();
    input.value = "";
})


// function getWeatherData(){
//     return new Promise((resolve, reject) => {
//         fetch(currentURL, {mode:"cors"})
//             .then(response => {
//                 if(!response.ok){
//                     throw new Error(`HTTP error! Status: ${response.status}`)
//                 }
//                 return response.json();
//             })
//             .then(data => resolve(data))
//             .catch(error => reject(error))
//     })
// }

// getWeatherData()
//     .then(
//         data => console.log(data)
//     )
//     .catch(
//         error => console.log(error)
//     )