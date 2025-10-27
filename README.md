# weather-now

A small React application that fetches the current weather for a searched city or the user's current location using the Open‑Meteo APIs.

## Features
- Search by city name (uses Open‑Meteo Geocoding API)
- Use browser geolocation to get local weather
- Current temperature, weather description, wind speed and direction
- Toggle between Celsius and Fahrenheit
- Responsive UI, graceful error handling

## How to run locally
1. Ensure Node.js (>=16) is installed
2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

Open the provided localhost URL in your browser.

## Deployment
This project can be deployed to CodeSandbox, StackBlitz, Vercel, or Netlify. For quick sharing, open the project in CodeSandbox (import from GitHub or upload files) or paste the files into StackBlitz.

## APIs used
- Open‑Meteo Geocoding: https://geocoding-api.open-meteo.com
- Open‑Meteo Weather: https://api.open-meteo.com

## Notes
No API keys are required. All endpoints are public.
