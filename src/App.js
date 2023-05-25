import "./styles/App.css";
import bg_light from "./assets/images/bg-light.png";
import { useEffect, useState } from "react";
import { SearchBar } from "./components/search-bar";
import { WeatherList } from "./components/weather-list";
import {
  formatHistoryRecord,
  getHistoryRecord,
  updateHistoryRecord,
} from "./helpers/history";
import { getWeatherByLatLon } from "./api/current-weather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!currentWeather) {
        setIsLoading(true);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              let lat = position.coords.latitude;
              let lon = position.coords.longitude;

              if (lat && lon) {
                const { success, data } = await getWeatherByLatLon({
                  lat,
                  lon,
                });

                if (success) {
                  const newData = formatHistoryRecord(data);

                  const history = updateHistoryRecord(newData);

                  setCurrentWeather(newData);
                  setHistory(history);
                }
              }

              setIsLoading(false);
            },
            (error) => {
              const history = getHistoryRecord();
              setHistory(history);
              setIsLoading(false);
            }
          );
        }
      }
    };

    handler();
  }, []);

  return (
    <div
      className="bg-container"
      style={{ backgroundImage: `url(${bg_light})` }}
    >
      <div className="main-container">
        <SearchBar
          setCurrentWeather={setCurrentWeather}
          setHistory={setHistory}
        />

        {currentWeather || history.length > 0 ? (
          <WeatherList
            currentWeatherState={[currentWeather, setCurrentWeather]}
            historyState={[history, setHistory]}
          />
        ) : (
          isLoading && <div className="loading-container">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default App;
