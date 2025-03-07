const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (info, searchParams) => {
  const url = new URL(BASE_URL + info);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
};

const iconUrlFromCode = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (sec, offset, format = "full") => {
  if (!sec || typeof sec !== "number") return "Invalid DateTime";

  const utcTime = new Date(sec * 1000);
  const localTime = new Date(utcTime.getTime() + offset * 1000);
  const options = {
    weekday: format === "full" ? "long" : undefined,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "UTC", 
  };
  return localTime.toLocaleString("en-US", options);
};

const formatCurrent = (data) => {
  if (!data) return null;

  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    speed,
    lat,
    lon,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime: formatToLocalTime(dt, timezone),
    dt,
    timezone,
  };
};

const formatForecastWeather = (secs, offset, data) => {
  if (!data) return { hourly: [], daily: [] };

  // Hourly forecast: Get next 5 readings
  const hourly = data
    .filter((f) => f.dt > secs)
    .slice(0, 5)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  // Daily forecast: Get readings at 00:00 UTC
  const daily = data
    .filter((f) => f.dt_txt.endsWith("00:00:00"))
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  const currentWeatherData = await getWeatherData("weather", searchParams);
  const formattedCurrentWeather = formatCurrent(currentWeatherData);

  if (!formattedCurrentWeather) return null;

  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  const forecastData = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  });
  const formattedForecast = formatForecastWeather(
    dt,
    timezone,
    forecastData?.list
  );

  return { ...formattedCurrentWeather, ...formattedForecast };
};

export default getFormattedWeatherData;
