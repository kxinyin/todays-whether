import { Delete, Search } from "@mui/icons-material";
import "../../styles/weather-list.css";
import { getWeatherByLocation } from "../../api/current-weather";
import {
  formatHistoryRecord,
  removeHistoryRecord,
  updateHistoryRecord,
} from "../../helpers/history";

export const SearchHistory = (props) => {
  const { setCurrentWeather, historyState } = props;
  const [history, setHistory] = historyState;

  const onSearch = async (location) => {
    if (location) {
      const { success, data } = await getWeatherByLocation({ location });

      if (success) {
        const newData = formatHistoryRecord(data);
        const history = updateHistoryRecord(newData);

        setCurrentWeather(newData);
        setHistory(history);
      }
    }
  };

  const onRemove = (location) => {
    if (location) {
      const history = removeHistoryRecord(location);

      setHistory(history);
    }
  };

  return (
    <div className="history-container">
      <div>Search History</div>

      <div className="history-wrapper">
        {history.map((each, index) => (
          <div key={index} className="history-card">
            <div className="history-info">
              <div>
                {each.name}, {each.country}
              </div>

              <div className="history-info-datetime">{each.datetime}</div>
            </div>

            <div className="history-action-container">
              <button onClick={() => onSearch(each.name)}>
                <Search />
              </button>
              <button onClick={() => onRemove(each.name)}>
                <Delete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
