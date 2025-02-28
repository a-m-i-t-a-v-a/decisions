/* eslint-disable react/prop-types */
const Forecast = ({ title, data }) => {
  return (
    <div>
      <div className="forecast-header">
        <p className="forecast-title">{title}</p>
      </div>
      <hr className="horizontal-breaker"/>
      <div className="forecast-container">
        {data.map((d, index) => (
          <div key={index} className="forecast-item">
            <p className="title">{d.title}</p>
            <img src={d.icon} alt="logo" className="forecast-icon" />
            <p className="forecast-temperature">{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
