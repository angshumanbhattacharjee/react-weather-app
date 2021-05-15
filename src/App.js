import './App.css';
import React, {useState} from 'react';

const api = {
  key: "f7292aaf3f1fbc92bcb5839b93c153ef",
  base: "api.openweathermap.org/data/2.5/"
}

function App() {

  

  const dateBuilder = new Date().toDateString();

  return (
    <div className="app">
      <main>
        <div className="search-box">
        <input
          className="search-bar"
          type="text"
          placeholder="Search Location..."
        />
        </div>
        <div className="location-box">
          <div className="location">Kolkata, India</div>
          <div className="date">{dateBuilder}</div>
        </div>
        <div className="weather-box">
          <div className="temp"> 20°C</div>
          <div className="weather">Sunny</div>
        </div>
      </main>
    </div>
  );
}

export default App;
