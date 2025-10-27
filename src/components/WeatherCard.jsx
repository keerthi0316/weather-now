import React from 'react'
function cToF(c) { return (c * 9/5) + 32 }


// Minimal mapping of weather codes (from Open-Meteo) to description/emojis.
const weatherMap = {
0: ['Clear sky', '☀️'],
1: ['Mainly clear', '🌤️'],
2: ['Partly cloudy', '⛅'],
3: ['Overcast', '☁️'],
45: ['Fog', '🌫️'],
48: ['Depositing rime fog', '🌫️'],
51: ['Drizzle: Light', '🌦️'],
53: ['Drizzle: Moderate', '🌦️'],
55: ['Drizzle: Dense', '🌧️'],
61: ['Rain: Slight', '🌧️'],
63: ['Rain: Moderate', '🌧️'],
65: ['Rain: Heavy', '⛈️'],
71: ['Snow: Slight', '🌨️'],
73: ['Snow: Moderate', '🌨️'],
75: ['Snow: Heavy', '❄️'],
80: ['Rain showers: Slight', '🌦️'],
81: ['Rain showers: Moderate', '🌧️'],
82: ['Rain showers: Violent', '⛈️'],
95: ['Thunderstorm: Moderate', '⛈️'],
99: ['Thunderstorm with hail', '🌩️']
}


export default function WeatherCard({ weather, location, unit='C' }){
const tempC = weather.temperature
const temp = unit === 'C' ? tempC : cToF(tempC)
const windKph = (weather.windspeed * 3.6).toFixed(1) // m/s -> km/h
const code = weather.weathercode
const [label, emoji] = weatherMap[code] || ['Unknown', '❓']


return (
<section className="card">
<div className="card-head">
<div className="place">
<strong>{location.name}{location.country ? `, ${location.country}` : ''}</strong>
<div className="time">Updated: {new Date(weather.time).toLocaleString()}</div>
</div>
<div className="icon">{emoji}</div>
</div>


<div className="card-body">
<div className="temp">{Math.round(temp)}°{unit}</div>
<div className="desc">{label}</div>


<div className="metrics">
<div>Wind: {windKph} km/h</div>
<div>Direction: {weather.winddirection}°</div>
<div>Model time: {weather.time}</div>
</div>
</div>
</section>
)
}