
const weatherform = document.querySelector(".weatherform");
const  cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "d63541b81b03b31bfaf6a426c508e422";

weatherform.addEventListener("submit",async event =>{

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getweatherData(city);
            displayweatherinfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error.message);
        }
    }
    else{
        displayError("Enter a city, please!");
    }


});

async function getweatherData(city){
    const apiurl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apikey}`; // Used dynamic city input
 ;

    const response = await fetch(apiurl);

    if(!response.ok){
        throw new Error ("could not fetch weather data")
    }

    return await response.json();
}


function displayweatherinfo(data){

    const {name: city,
        main: {temp, humidity},
        weather:[{description, id}]} = data;

        card.textContent = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${temp}°C`
        humidityDisplay.textContent = `humidity: ${humidity}%`
        descDisplay.textContent = description;
        weatherEmoji.textContent = getweatherEmoji(id);

        cityDisplay.classList.add("citydisplay");
        tempDisplay.classList.add( "tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji")

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
    

}


    function getweatherEmoji(weatherId) {
        switch (true) {
            case (weatherId >= 200 && weatherId < 300):
                return "⛈️"; // Thunderstorm
            case (weatherId >= 300 && weatherId < 400):
                return "🌧️"; // Drizzle
            case (weatherId >= 500 && weatherId < 600):
                return "🌦️"; // Rain
            case (weatherId >= 600 && weatherId < 700):
                return "❄️"; // Snow
            case (weatherId >= 700 && weatherId < 800):
                return "🌫️"; // Atmosphere (fog, mist, etc.)
            case (weatherId === 800):
                return "☀️"; // Clear sky
            case (weatherId > 800):
                return "☁️"; // Clouds
            default:
                return "🌈"; // Default weather emoji
        }
    }
    


function displayError(message){

    const errorDisplay = document.createElement("P");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}