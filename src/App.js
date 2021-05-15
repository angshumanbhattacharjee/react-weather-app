import './App.css';
import React, {useState} from 'react';

const api = {
  key: "f7292aaf3f1fbc92bcb5839b93c153ef",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = searchEvent => {
    if (searchEvent.key === "Enter") {
      fetch((`${api.base}weather?q=${query}&units=metric&appid=${api.key}`), 
      { 
        headers : { 
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = new Date().toDateString();
  
  const backgroundImg = (typeof weather.main != "undefined") ? (weather.main.temp > 20 ? 'app warm' : 'app cold') : ('app');

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
            </div>
          </div>
        ) : ('Location not found')}
        
      </main>
    </div>
  );
}

export default App;
