import React, { useState, useEffect } from 'react'

function cToF(c) { return (c * 9/5) + 32 }

const weatherMap = {
  0: ['Clear sky', '☀️'],
  1: ['Mainly clear', '🌤️'],
  2: ['Partly cloudy', '⛅'],
  3: ['Overcast', '☁️'],
  45: ['Fog', '🌫️'],
  48: ['Rime fog', '🌫️'],
  51: ['Drizzle: Light', '🌦️'],
  61: ['Rain: Slight', '🌧️'],
  63: ['Rain: Moderate', '🌧️'],
  65: ['Rain: Heavy', '⛈️'],
  71: ['Snow: Slight', '🌨️'],
  73: ['Snow: Moderate', '🌨️'],
  75: ['Snow: Heavy', '❄️'],
  80: ['Rain showers', '🌦️'],
  81: ['Rain showers', '🌧️'],
  82: ['Violent rain', '⛈️'],
  95: ['Thunderstorm', '⛈️'],
  99: ['Hail', '🌩️']
}

export default function WeatherCard({ weather, location, unit = 'C' }) {
  const [now, setNow] = useState(new Date())

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const tempC = weather.temperature
  const temp = unit === 'C' ? tempC : cToF(tempC)
  const [label, emoji] = weatherMap[weather.weathercode] || ['Unknown', '❓']
  const windKph = (weather.windspeed * 3.6).toFixed(1)

  return (
    <section className="card">
      <div className="card-head">
        <div className="place">
          <strong>
            {location.name}{location.country ? `, ${location.country}` : ''}
          </strong>
          <div className="time">Local time: {now.toLocaleTimeString()}</div>
        </div>
        <div className="icon">{emoji}</div>
      </div>

      <div className="card-body">
        <div className="temp">{Math.round(temp)}°{unit}</div>
        <div className="desc">{label}</div>

        <div className="metrics">
          <div>Wind: {windKph} km/h</div>
          <div>Direction: {weather.winddirection}°</div>
          <div>Updated: {new Date(weather.time).toLocaleString()}</div>
        </div>
      </div>
    </section>
  )
}
