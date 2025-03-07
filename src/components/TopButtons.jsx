/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const TopButtons = ({ setQuery }) => {
  const favoriteCities = useSelector((state) => state.favorites.cities);

  return (
    <div className="top-buttons">
      {favoriteCities.length === 0 ? (
        <p>No favorite cities yet. Add some!</p>
      ) : (
        favoriteCities.map((city, index) => (
          <button
            key={index}
            className="top-button"
            onClick={() => setQuery({ q: city })}
          >
            {city}
          </button>
        ))
      )}
    </div>
  );
};

export default TopButtons;
