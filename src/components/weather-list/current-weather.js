import "../../styles/weather-list.css";
import cloud from "../../assets/images/cloud.png";
import sun from "../../assets/images/sun.png";

const Location = ({ data }) => {
  return (
    <div className="subheader-location">
      {data.name}, {data.country}
    </div>
  );
};

const ExtraInfo = ({ data }) => {
  return (
    <>
      <div>{data.datetime}</div>
      <div>Humidity: {data.humidity}%</div>
      <div>{data.weather}</div>
    </>
  );
};

export const CurrentWeather = (props) => {
  const { currentWeather: data } = props;

  const isCloudy = data.weather === "Clouds";

  return (
    <div>
      <img
        alt="weather"
        src={isCloudy ? cloud : sun}
        className="list-weather-image"
      />

      <div className="header">
        <div>Today's Weather</div>
        <div className="header-degree">{data.temp}&deg;</div>
        <div>
          H: {data.temp_max}&deg; L: {data.temp_min}&deg;
        </div>
      </div>

      <div className="subheader-desktop">
        <Location data={data} />
        <ExtraInfo data={data} />
      </div>

      <div className="subheader-mobile">
        <Location data={data} />

        <div className="subheader-stack">
          <ExtraInfo data={data} />
        </div>
      </div>
    </div>
  );
};
