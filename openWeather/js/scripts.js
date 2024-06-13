//API_KEY
const apiKey_openWeather = 'db5779e6e8b5fc1a68a7dd07232f890d';

//Elementos
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search');

const cityResponse = document.getElementById('city');
const countryResponse = document.getElementById('country');

const temperatureResponse = document.getElementById('temperature').getElementsByTagName('span')[0];
const humidityResponse = document.getElementById('humidity').getElementsByTagName('span')[0];
const windResponse = document.getElementById('wind').getElementsByTagName('span')[0];

const weatherIconResponse = document.getElementById('weather-icon'); 

//Funcoes
async function getWeatherData(city){

    const apiOpenWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey_openWeather}&lang=pt_br`;

    let res = await fetch(apiOpenWeatherURL)
    let data = await res.json()

    return data;    
}

function getCountryFlag(country){
    const apiCountryURL = 'https://flagsapi.com/';
    const apiCountryImageDetails = '/flat/32.png';
    const apiCountryImage = `${apiCountryURL}${country}${apiCountryImageDetails}`;

    return apiCountryImage;
}

async function showWeatherData(city){
    // console.log(await getWeatherData(city));
    let data = await getWeatherData(city);

    cityResponse.innerText = data.name;
    countryResponse.src = getCountryFlag(data.sys.country);

    temperatureResponse.innerText = parseInt(data.main.temp);
    humidityResponse.innerText = `${data.main.humidity}%`;
    windResponse.innerText = `${data.wind.speed} Km/h`;

    weatherIconResponse.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

//Eventos
searchButton.addEventListener('click', (info) => {
    info.preventDefault();

    let input = cityInput.value;
    
    showWeatherData(input);
});