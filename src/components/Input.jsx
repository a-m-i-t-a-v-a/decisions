/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

const Input = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");
  const handleSearchQuery = () => {
    if (city !== "") setQuery({ q: city });
  };
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };
  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          placeholder="Search by city..."
          className="search-input"
        />
        <BiSearch size={30} className="search-icon" onClick={handleSearchQuery} />
        <BiCurrentLocation size={30} className="location-icon" onClick={handleLocationClick} />
      </div>
      <div className="units-container">
        <button className="unit-button" onClick={() => setUnits("metric")}>C</button>
        <p className="unit-separator">|</p>
        <button className="unit-button" onClick={() => setUnits("imperial")}>F</button>
      </div>
    </div>
  );
};

export default Input;