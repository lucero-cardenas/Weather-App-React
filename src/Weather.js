import React, { useState } from "react";
import GetDate from "./GetDate";

import axios from "axios";

import './App.css';

export default function Weather (){
    let [country, setCountry] = useState("");
    let [city, setCity] = useState("");
    let [globCity, setGlobCity] = useState("");
    let [temp, setTemp] = useState(null);
    let [desc, setDesc] = useState("");
    let [hum, setHum] = useState(null);
    let [wind, setWind] = useState(null);
    let [icon, setIcon] = useState(null);
    let icons = {
        "01d": `fa-sun`,
        "01n": `fa-moon`,
        "02d": `fa-cloud-sun`,
        "02n": `fa-cloud-moon`,
        "03d": `fa-cloud`,
        "03n": `fa-cloud`,
        "04d": `fa-cloud`,
        "04n": `fa-cloud`,
        "09d": `fa-cloud-showers-heavy`,
        "09n": `fa-cloud-showers-heavy`,
        "10d": `fa-cloud-rain`,
        "10n": `fa-cloud-rain`,
        "11d": `fa-bolt`,
        "11n": `fa-bolt`,
        "13d": `fa-snowflake`,
        "13n": `fa-snowflake`,
        "50d": `fa-smog`,
        "50n": `fa-smog`
    };

    let [display, setDisplay] = useState(null);
    let [content, setContent] = useState(false);

    let apiKey = '82d58ea2bafbe8a8a9c84742e41d01ce';
    let [units, setUnits] = useState("metric");
    let [windUnit, setWindUnit] = useState(" km/h");

    let [apiUrl, setApiUrl] = useState(null);
    

    function newCity(event) {
        setCity(event.target.value);
    }

    function getWeather(response) {
        setCountry(response.data.sys.country);
        setCity("");
        setGlobCity(response.data.name);
        setTemp(response.data.main.temp);
        setDesc(response.data.weather[0].description);
        setHum(response.data.main.humidity);
        setWind(response.data.wind.speed);
        setIcon(icons[response.data.weather[0].icon]);

        console.log (response);

        setDisplay(null);
        setContent(true);
        setApiUrl(null);
    }

    function searchSubmit(event) {
        event.preventDefault();
        setGlobCity("");
        setCountry("");
        setTemp(null);
        setDesc("");
        setHum(null);
        setWind(null);
        setIcon(null);
        setContent(false);
        setDisplay(null);
        setApiUrl(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`);

        if (city.length > 0) {
        setDisplay("Loading...");
        console.log(apiUrl);
        axios.get(apiUrl).then(getWeather);
        }
    }

    function myPosition(position){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        setApiUrl (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`);
        console.log(apiUrl);
        axios.get(apiUrl).then(getWeather);

        //setApiUrl (`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`);
        //axios.get(apiUrl).then();
    }

    function getPosition(){
        navigator.geolocation.getCurrentPosition(myPosition);
        setCity("");
        setGlobCity("");
        setCountry("");
        setTemp(null);
        setDesc("");
        setHum(null);
        setWind(null);
        setIcon(null);
        setContent(false);
    }

    function unitToF(event){
        event.preventDefault();
        setUnits("imperial"); // for further searches
        setWindUnit(" mph");

        setApiUrl (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`);
        axios.get(apiUrl).then(getWeather);
        //setApiUrl (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`);
        //axios.get(apiUrl).then(showForecast);
    }

    function unitToC(event){
        event.preventDefault();
        setUnits("metric"); //for further searches
        setWindUnit(" km/h");

        setApiUrl (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`);
        axios.get(apiUrl).then(getWeather);
        //setApiUrl (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`);
        //axios.get(apiUrl).then(showForecast);
    }

    let form = (
    <form className="mb-3" onSubmit={searchSubmit}>
      <input
        type="search"
        onChange={newCity}
        placeholder="Enter a city"
        autoComplete="yes"
      />
      <input type="submit" value="🔍" />
      <input type = "button" value="Current location" onClick={getPosition}/>
    </form>
    );

    //getPosition();

    if (content) {
    return (
        <div className= "card" style="max-width:60rem; min-width:40rem;">
            {form}
            <br />
            <span className="col-7" id="city-date">
                <h1 className="card-title">{globCity}, {country}</h1>
                <GetDate/>
                <h3 className= "card-subtitle mb-2 text-muted" id="humidity">Humidity: {hum}%</h3>
                <h3 className= "card-subtitle mb-2 text-muted" id="wind">Wind speed: {wind}{windUnit}</h3>
            </span>
            <span className="col-5">
                <i className={`fas ${icon}`}></i>
                <div className="row desc"><h4 className= "card-subtitle mb-2 text-muted" id="description">{desc}</h4></div>
                <div className="col temp"><h2 id="curr-temp">{Math.round(temp)}°</h2></div>
                <div className="col units-max-min"><h4 className = "units"><a href="/" id="unit-c" onClick={unitToC}>C</a> | <a href="/" id= "unit-f" onClick={unitToF}>F</a></h4></div>
            </span>
        </div>
    );
  } else {
      return (
        <div className= "card">
            {form}
            <br />
            <GetDate/>
            <br />
            {display}
            </div>
    );
  }
}