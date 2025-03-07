/* eslint-disable react/prop-types */
import { BiSolidDropletHalf } from "react-icons/bi";
import { FaThermometerEmpty } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const TempDetails = ({
  weather: {
    details,
    temp,
    icon,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {

  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/hr" : "m/s"}`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: `${sunrise}`,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: `${sunset}`,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div>
      <div className="temp-details-container">
        <p className="details-text">Conditions : {details}</p> 
      </div>

      <div className="temp-main">
        <div className="temp-left">
          <img src={icon} alt="weather icon" className="temp-icon" />
          <p className="temp-value">{`${temp.toFixed()}°`}</p>
        </div>

        <div className="temp-right">
          <div className="temp-details-list">
            {verticalDetails.map((val) => (
              <div key={val.id} className="detail-item">
                <val.Icon size={18} className="icon-detail" />
                {val.title}:{" "}
                <span className="temp-detail-value">{val.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="horizontal-details">
        {horizontalDetails.map((detail) => (
          <div key={detail.id} className="detail-item">
            <detail.Icon size={30} className="icon-hr" />
            <p className="title-of-temp">
              {`${detail.title}: `}
              <span className="temp-detail-value">{detail.value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempDetails;
