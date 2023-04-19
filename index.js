const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/",
};

function getResults(query) {
    let url = `${api.base}weather?q=${query}&units=metric&appid=${api.key}`;
    //https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&units=metric&appid=7e3f21edee540e6110af347b55eb1ab2
    //   console.log(url);

    fetch(url)
        .then((weather) => weather.json())
        .then((resp) => displayResults(resp));
}
function displayResults(weather) {
    console.log(weather);
    document.querySelector("main").style.display = "block";
    let cityHTML = document.querySelector(".city");
    let cityTemp = document.querySelector(".current .temp");
    let cityWeather = document.querySelector(".current .weather");
    let dateHTML = document.querySelector(".location .date");
    let cityHiLow = document.querySelector(".current .hi-low")

    if (weather.cod == 404) {
        let cityHTML = document.querySelector(".city");
        cityHTML.innerHTML = `Try with a valid city`;
        cityTemp.innerHTML = ``;
        cityWeather.innerHTML = ``
        dateHTML.innerHTML = ``;
        cityHiLow.innerHTML = ``;
    } else {
        cityHTML.innerHTML = `${weather.name}`;
        cityTemp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
        cityWeather.innerHTML = `${weather.weather[0].main}`
        dateHTML.innerHTML = buildDate();
        cityHiLow.innerHTML = `${Math.round(weather.main.temp_min)}°c/ ${Math.round(weather.main.temp_max)}°c`;
    }
}

function buildDate() {
    let now = new Date();
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let day = days[now.getDay()];
    let month = months[now.getMonth()];
    let year = now.getFullYear();

    return `${day} ${now.getDate()} ${month} ${year}`;
}

function getInput() {
    const searchBox = document.querySelector(".search-btn");
    searchBox.addEventListener("keydown", function (event) {
        if (event.code === "Enter") {
            getResults((document.querySelector(".search-btn").value));
        }
    })
}

getInput();