/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../services/favoriteCities";

const Input = ({ weather, setQuery, setUnits }) => {
  const name = weather?.name || "";
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const favoriteCities = useSelector((state) => state.favorites.cities);
  const isFavorite = favoriteCities.includes(name);

  const handleFavoriteToggle = () => {
    console.log("Toggling favorite:", name);
    isFavorite ? dispatch(removeFavorite(name)) : dispatch(addFavorite(name));
  };
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
        <BiSearch
          size={30}
          className="search-icon"
          onClick={handleSearchQuery}
        />
        <BiCurrentLocation
          size={30}
          className="location-icon"
          onClick={handleLocationClick}
        />
      </div>
      <div className="units-container">
        <button className="unit-button" onClick={() => setUnits("metric")}>
          C
        </button>
        <p className="unit-separator">|</p>
        <button className="unit-button" onClick={() => setUnits("imperial")}>
          F
        </button>
      </div>
      <button className="favorite-button" onClick={handleFavoriteToggle}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default Input;
