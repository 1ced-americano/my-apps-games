import React, {useState} from "react"
import "./WeatherBounty.css"
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icons from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";


const WeatherBounty = () => {
  let api_key = "de794a6f7ac5b572a24d4b4845b613b0";
  const [wicon,setWicon] = useState(cloud_icon);

  
  const search = async () => {
    const element =document.getElementsByClassName("cityInput");
    if (element[0].value==="") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();
    
  
    // Access DOM elements within the useEffect when the component is mounted
    const humidityElements = document.getElementsByClassName("humidity-percent");
    const windElements = document.getElementsByClassName("wind-speed");
    const temperatureElements = document.getElementsByClassName("weather-temp");
    const locationElements = document.getElementsByClassName("weather-location");

    
    if (humidityElements[0]) {
      humidityElements[0].innerHTML = data.main.humidity + "°";
    }
    if (windElements[0]) {
      windElements[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
    }
    if (temperatureElements[0]) {
      temperatureElements[0].innerHTML = Math.floor(data.main.temp) + "°C";
    }
    if (locationElements[0]) {
      locationElements[0].innerHTML = data.name;
    }


    if (data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
      setWicon(clear_icon);
    } else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
      setWicon(cloud_icon);
    }
    else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
      setWicon(drizzle_icon);
    }
    else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
      setWicon(drizzle_icon);
    }
    else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
      setWicon(rain_icon);
    }
    else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
      setWicon(rain_icon);
    }
    else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
      setWicon(snow_icons);
    }
    else{
      setWicon(clear_icon);
    }
  }
  return(
    <div  className="container">
      <div className="top-bar">
<input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={()=>{search()}}>
          <img src={search_icon} alt=""/>
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt=""/>
    </div>
    <div className="weather-temp"></div>
    <div className="weather-location"></div>
    <div className="data-container">
      <div className="element">
        <img src={humidity_icon} alt="" className="icon" />
        <div className="data">
          <div className="humidity-percent"></div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={wind_icon} alt="" className="icon" />
        <div className="data">
          <div className="wind-speed"></div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
    </div>
        )
  };
export default WeatherBounty;