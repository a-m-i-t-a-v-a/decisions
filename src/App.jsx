import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import Input from "./components/Input";
import TempDetails from "./components/TempDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weatherService";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [query, setQuery] = useState({ q: "London" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const getBackgroundClass = () => {
    if (!weather) return "bg-cold";
    const thresholdUnits = units === "metric" ? 20 : 60;
    return weather.temp <= thresholdUnits ? "bg-cold" : "bg-warm";
  };

  useEffect(() => {
    const getWeather = async () => {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
    };
    getWeather();
  }, [query, units]);

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <TopButtons setQuery={setQuery} />
      <Input setQuery={setQuery} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempDetails weather={weather} units={units} />
          <Forecast title="3 hour step forecast" data={weather.hourly} />
          <Forecast title="5 day forecast" data={weather.daily} />
        </>
      )}
    </div>
  );
}

export default App;
