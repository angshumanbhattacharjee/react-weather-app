import './App.css';
import React, {useState} from 'react';

const api = {
  key: "f7292aaf3f1fbc92bcb5839b93c153ef",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [weatherError, setWeatherError] = useState('Search Weather...');

  const search = searchEvent => {
    if (searchEvent.key === "Enter") {
      setWeather({});
      setWeatherError('');
      fetch((`${api.base}weather?q=${query}&units=metric&appid=${api.key}`), 
      { 
        headers : { 
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(result => {
        if (result.cod === 200) {
          setWeather(result);
          setQuery('');
          setWeatherError('');
          console.log(result);
        }
      })
      .catch(setWeatherError('Location not found...'));
            
    }
  }

  const dateBuilder = new Date().toDateString();
  
  const backgroundImg = (typeof weather.main != "undefined") ? (weather.main.temp > 20 ? 'app warm' : 'app cold') : ('app');
  const weathericon = (typeof weather.main != "undefined") ? (`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`) : ('');

  return (
    <div className={backgroundImg}>
      <main>
        <div className="search-box">
        <input
          className="search-bar"
          type="text"
          placeholder="Search Location..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder}</div>
            </div>
            <div className="weather-box">
              <div className="temp"> {Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].description}</div>
              <div className="icon"><img src={weathericon} alt="weather icon" /></div>
            </div>
          </div>
        ) : (<div className="default-msg"> {weatherError}</div>)}
        
      </main>
    </div>
  );
}

export default App;
