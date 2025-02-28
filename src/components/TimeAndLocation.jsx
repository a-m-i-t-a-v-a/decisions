/* eslint-disable react/prop-types */
const TimeAndLocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div className="time-location-container">
      <p className="time-location-time">{formattedLocalTime}</p>
      <p className="time-location-place">
        {name}, {country}
      </p>
    </div>
  );
};

export default TimeAndLocation;
