//Today's Card Variables:
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar"),
    currentCity = "Cairo",
    apiResponse,
    responseData,
    date = new Date(),
    weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thuresday','Friday','Saturday'],
    monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'];

//Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay"),
    nextDate = document.getElementsByClassName("nextDate"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("max-degree"),
    minDegree = document.getElementsByClassName("min-degree"),
    nextDayDescription = document.getElementsByClassName("nextDay-description");


//Get Data from API:
async function getWeatherData() {
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=848e4c9efef048e494f100521210205&q=${currentCity}&days=3&aqi=no&alerts=no`);
    responseData = await apiResponse.json();
    console.log(responseData);
    displayTodayWeather();
    displayNextDaysWeather();
};

//Display Today's Data:
function displayTodayWeather() {
    today.innerHTML = weekDays[date.getDay()];
    todayDate.innerText = `${date.getDate()} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML = responseData.location.name;
    todayDegree.innerHTML = responseData.current.temp_c;
    todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`);
    description.innerHTML = responseData.current.condition.text;
    humidty.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerText =responseData.current.wind_dir
};

//Display Next Days Data:
function displayNextDaysWeather() {
    for(let i = 0; i < nextDay.length; i++)
    {
        nextDay[i].innerHTML = weekDays[date.getDay()+i+1];
        nextDate[i].innerHTML = `${date.getDate()+i+1} ${monthName[date.getMonth()]}`;
        nextDayIcon[i].setAttribute("src", `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescription[i].innerHTML= responseData.forecast.forecastday[i+1].day.condition.text;
    }
};

//Live Search City Function:
searchBar.addEventListener("keyup", function() {
    currentCity = searchBar.value;
    getWeatherData();
});

//Onload Calling Function:
getWeatherData();


//Submit Subscribe LightBox:
let subscribeBtn = document.getElementById("subscribeBtn"),
    closeBtn = document.getElementById("closeBtn"),
    submitLighBox = document.getElementById("submit-lighBox"),
    emailInput = document.getElementById("emailInput"),
    emailInputAlert = document.getElementById("emailInputAlert");


subscribeBtn.addEventListener("click", function() {
    if(validateEmail() == true) {
        
        submitLighBox.style.display = "flex";
    }
    else {
        subscribeBtn.disabled = true;
    }
});

closeBtn.addEventListener("click", function() {
    submitLighBox.style.display = "none";
    emailInput.value = "";
});

//Validate Subscriibe Email:
function validateEmail() {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
            
                if(regex.test(emailInput.value) == true)
                {
                    emailInputAlert.classList.add("d-none");
                    emailInputAlert.classList.remove("d-block");

                    subscribeBtn.disabled = false;

                    return true;
                
                } else {
            
                    emailInputAlert.classList.add("d-block");
                    emailInputAlert.classList.remove("d-none");

                    subscribeBtn.disabled = true;
            
                    return false;
                };
}

emailInput.addEventListener("keyup", validateEmail);