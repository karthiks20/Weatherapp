import React, { useState } from 'react';
import "./App.css";
import searchIcon from "./assets/search.png";
import cloudyIcon from "./assets/cloudy.jpg";
import drizzleIcon from "./assets/drizzle.jpg";
import humidityIcon from "./assets/humidity.png";
import rainyIcon from "./assets/rainy.png";
import windyIcon from "./assets/windy.jpg";
import sunnyIcon from "./assets/sunny.png";
import snowIcon from "./assets/snow.jpg";

const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt="Weather Icon" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="Humidity" className='icon' />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windyIcon} alt="Wind" className='icon' />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const [text, setText] = useState("CHENNAI");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const weatherIconMap = {
    '01d': sunnyIcon,
    '01n': sunnyIcon,
    '02d': cloudyIcon,
    '02n': cloudyIcon,
    '03d': drizzleIcon,
    '03n': drizzleIcon,
    '04d': drizzleIcon,
    '04n': drizzleIcon,
    '09d': rainyIcon,
    '09n': rainyIcon,
    '10d': rainyIcon,
    '10n': rainyIcon,
    '13d': snowIcon,
    '13n': snowIcon,
  }

  const search = async () => {
    setLoading(true);
    let api_key = "8527ba601cba60dc5ce5e7bacde7455d";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || sunnyIcon);
      setCityNotFound(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  }

  return (
    <>
      <div className="container">
        <div className='input-container'>
          <input
            type="text"
            className="cityInput"
            placeholder='Search City'
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <div className='search-icon' onClick={() => search()}>
            <img src={searchIcon} alt="Search" />
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : cityNotFound ? (
          <div>City not found</div>
        ) : (
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            log={log}
            humidity={humidity}
            wind={wind}
          />
        )}
        
        <p className='copyright'>
          Designed By <span>Karthik</span>
        </p>
      </div>
    </>
  );
}

export default App;
