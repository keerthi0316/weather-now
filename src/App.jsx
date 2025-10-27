import React, { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'

// Open-Meteo API endpoints
const GEOCODE = (q) =>
  `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=5&language=en&format=json`
const WEATHER = (lat, lon, timezone = 'auto') =>
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=${timezone}`

export default function App() {
  const [query, setQuery] = useState('')
  const [unit, setUnit] = useState('C')
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes

  // Load default weather on mount
  useEffect(() => {
    fetchByCity('New Delhi')
  }, [])

  // Auto-refresh weather every 5 minutes if location is set
  useEffect(() => {
    if (!location) return
    const interval = setInterval(() => {
      fetchWeather(location.lat, location.lon)
    }, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [location])

  async function fetchByCity(city) {
    setError(null)
    setLoading(true)
    setWeather(null)
    try {
      const r = await fetch(GEOCODE(city))
      if (!r.ok) throw new Error('Geocoding failed')
      const j = await r.json()
      if (!j.results || j.results.length === 0) {
        setError('No location found')
        setLoading(false)
        return
      }
      const best = j.results[0]
      const loc = {
        name: best.name,
        lat: best.latitude,
        lon: best.longitude,
        country: best.country,
      }
      setLocation(loc)
      await fetchWeather(loc.lat, loc.lon)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function fetchWeather(lat, lon) {
    setError(null)
    setLoading(true)
    try {
      const r = await fetch(WEATHER(lat, lon))
      if (!r.ok) throw new Error('Weather API failed')
      const j = await r.json()
      if (!j.current_weather) throw new Error('No current weather data')
      setWeather(j.current_weather)
    } catch (err) {
      setError(err.message || 'Weather fetch failed')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    fetchByCity(query.trim())
  }

  function handleGeoLocate() {
    setError(null)
    if (!navigator.geolocation) {
      setError('Geolocation not supported by browser')
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        setLocation({ name: 'Your location', lat: latitude, lon: longitude, country: '' })
        await fetchWeather(latitude, longitude)
        setLoading(false)
      },
      (err) => {
        setError(err.message || 'Unable to retrieve location')
        setLoading(false)
      }
    )
  }

  return (
    <div className="app-root">
      <header className="header">
        <h1>WeatherNow</h1>
        <p className="tag">Live weather & auto-updating data — powered by Open-Meteo</p>
      </header>

      <main className="main">
        <form onSubmit={handleSearch} className="search">
          <input
            aria-label="City name"
            placeholder="Search city, e.g. London or Mumbai"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="actions">
            <button type="submit" className="btn">Search</button>
            <button type="button" className="btn ghost" onClick={handleGeoLocate}>
              Use my location
            </button>
          </div>
        </form>

        <div className="controls">
          <label className="unit-toggle">
            Unit:
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="C">Celsius (°C)</option>
              <option value="F">Fahrenheit (°F)</option>
            </select>
          </label>
        </div>

        {loading && <div className="info">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {weather && location && (
          <WeatherCard weather={weather} location={location} unit={unit} />
        )}

        <footer className="footer">
          <small>Data auto-refreshes every 5 minutes. Source: Open-Meteo.</small>
        </footer>
      </main>
    </div>
  )
}
