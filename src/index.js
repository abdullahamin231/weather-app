import { createClient } from "pexels";

const client = createClient("iaFgDzcOb7e5sw3M4NeqIsIiTO3zNKdvnxiaZRjdxRs22LUr4Ow7yzP6");

const baseUrl = "http://api.weatherapi.com/v1";
const weatherApiKey = "bd78ac7fb3ea49ec91c111815232412";
let city = "auckland";
let forecastUrl = `${baseUrl}/forecast.json?key=${weatherApiKey}&q=${city}&days=7&aqi=no&alerts=no`;
let query = city;

async function getImage() {
    try {
        const data = await client.photos.search({ query, per_page: 1 });
        const body = document.getElementById("body");
        body.style.backgroundImage = `url(${data.photos["0"].src.original})`;
    } catch (error) {
        console.error("Error fetching image data:", error.message);
    }
}


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
    rainvalElement.textContent = `${data.current.cloud}%`;
    const windvalElement = document.getElementById("windval");
    windvalElement.textContent = `${data.current.wind_kph}kph`;
    const hvalElement = document.getElementById("hval");
    hvalElement.textContent = `${data.current.humidity}%`;

    const fdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i = 0; i <= 6; i += 1) {
        const fday = document.getElementById(`day${i}-day`);
        const fdate = new Date(data.forecast.forecastday[i].date);
        const fate2 = fdate.getDay();
        fday.textContent = fdays[fate2];

        const ftemp = document.getElementById(`day${i}-temp`);
        ftemp.textContent = `${data.forecast.forecastday[i].day.maxtemp_c}°C`;

        const text = document.getElementById(`day${i}-text`);
        text.textContent = data.forecast.forecastday[i].day.condition.text;

        const fimgDiv = document.getElementById(`day${i}-img`);
        fimgDiv.innerHTML = "";
        const img = document.createElement("img");
        img.src = data.forecast.forecastday[i].day.condition.icon;
        fimgDiv.appendChild(img);
    }
}

async function getWeatherAPI() {
    try {
        const response = await fetch(forecastUrl, { mode: "cors" });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        renderWeather(data);
        console.log(data);
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}

getWeatherAPI();

const btn = document.getElementById("searchBtn");
btn.addEventListener("click", async () => {
    const input = document.getElementById("searchField");
    city = input.value;
    forecastUrl = `${baseUrl}/forecast.json?key=${weatherApiKey}&q=${city}&aqi=no&alerts=no`;
    getWeatherAPI();
    query = city;
    getImage();
    input.value = "";
});
