import React, { useState } from "react";
import GetDate from "./GetDate";

import axios from "axios";

import './App.css';

export default function Weather (props){
    let [country, setCountry] = useState("");
    let [city, setCity] = useState(props.city);
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

    let apiKey = '82d58ea2bafbe8a8a9c84742e41d01ce';
    let units = "metric";
    let windUnit = " km/h";

    let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

    function getWeather(response) {
        setCountry(response.data.sys.country);
        setGlobCity(response.data.name);
        setTemp(response.data.main.temp);
        setDesc(response.data.weather[0].description);
        setHum(response.data.main.humidity);
        setWind(response.data.wind.speed);
        setIcon(icons[response.data.weather[0].icon]);

        console.log (response);
    }

    let form = (
    <form className="mb-3">
      <input
        type="search"
        placeholder="Enter a city"
        autoComplete="yes"
      />
      <input type="submit" value="🔍" />
      <input type = "button" value="Current location"/>
    </form>
    );

    axios.get(apiUrl).then(getWeather);

    return (
        <div className= "inner card">
            {form}
            <div className="first" id="city-date">
                <h1 className="card-title">{globCity}, {country}</h1>
                <GetDate/>
                <h3 className= "card-subtitle mb-2 text-muted" id="humidity">Humidity: {hum}%</h3>
                <h3 className= "card-subtitle mb-2 text-muted" id="wind">Wind speed: {wind}{windUnit}</h3>
            </div>
            <div className="second">
                <i className={`fas ${icon}`}></i>
                <div className="desc"><h4 className= "card-subtitle mb-2 text-muted" id="description">{desc}</h4></div>
            </div>
            <div className="third">
                <div className="temp"><h2 id="curr-temp">{Math.round(temp)}°</h2></div>
                <div className="units-max-min"><h4 className = "units"><a href="/" >C</a> | <a href="/" >F</a></h4></div>
            </div>
        </div>
    );
}