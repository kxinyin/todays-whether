import "../../styles/weather-list.css";
import { CurrentWeather } from "./current-weather";
import { SearchHistory } from "./search-history";

export const WeatherList = (props) => {
  const { currentWeatherState, historyState } = props;

  const [currentWeather, setCurrentWeather] = currentWeatherState;
  const [history] = historyState;

  return (
    <div className="list-container">
      {currentWeather && <CurrentWeather currentWeather={currentWeather} />}
      {history.length > 0 && (
        <SearchHistory
          setCurrentWeather={setCurrentWeather}
          historyState={historyState}
        />
      )}
    </div>
  );
};
