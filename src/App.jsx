import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import Input from "./components/Input";
import TempDetails from "./components/TempDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import getFormattedWeatherData from "./services/weatherService";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./theme/ThemeContext"; 

function App() {
  const [query, setQuery] = useState({ q: "Oslo" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const { theme } = useTheme(); 

  useEffect(() => {
    const getWeather = async () => {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
    };
    getWeather();
  }, [query, units]);

  return (
    <div className={`app-container ${theme === "dark" ? "dark-mode" : "light-mode"}`}>
      <ThemeToggle />
      <TopButtons setQuery={setQuery} />
      <Input weather={weather} setQuery={setQuery} setUnits={setUnits} />
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
