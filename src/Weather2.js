import React from "react";
import GetDate from "./GetDate";

import './App.css';

export default function Weather (props){
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

    return (
        <div className= "inner card">
            {form}
            <div className="first" id="city-date">
                <h1 className="card-title">{props.city}, {props.country}</h1>
                <GetDate/>
                <h3 className= "card-subtitle mb-2 text-muted" id="humidity">Humidity: {props.hum}%</h3>
                <h3 className= "card-subtitle mb-2 text-muted" id="wind">Wind speed: {props.wind}km/h</h3>
            </div>
            <div className="second">
                <i className={`fas fa-cloud-sun`}></i>
                <div className="desc"><h4 className= "card-subtitle mb-2 text-muted" id="description">Scattered clouds</h4></div>
            </div>
            <div className="third">
                <div className="temp"><h2 id="curr-temp">{Math.round(props.temp)}°</h2></div>
                <div className="units-max-min"><h4 className = "units"><button>C</button> | <button>F</button></h4></div>
            </div>
        </div>
    );
}