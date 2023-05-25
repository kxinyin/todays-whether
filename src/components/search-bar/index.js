import { Search } from "@mui/icons-material";
import "./../../styles/search-bar.css";
import { useState } from "react";
import { getWeatherByLocation } from "../../api/current-weather";
import _ from "lodash";
import {
  formatHistoryRecord,
  updateHistoryRecord,
} from "../../helpers/history";

export const SearchBar = (props) => {
  const { setCurrentWeather, setHistory } = props;

  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState("");

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!searchText) {
      setSearchError("Please enter a city/country name.");
    }

    if (searchText) {
      const { success, message, data } = await getWeatherByLocation({
        location: searchText,
      });

      if (!success) {
        setSearchError(_.upperFirst(message));
      }

      if (success) {
        const newData = formatHistoryRecord(data);

        const history = updateHistoryRecord(newData);

        setSearchError("");
        setCurrentWeather(newData);
        setHistory(history);
      }
    }
  };

  return (
    <div>
      <form
        id="search-form"
        onSubmit={onSubmit}
        className="search-bar-container"
      >
        <div className="search-bar-input-container">
          <label>Country</label>
          <input type="text" value={searchText} onChange={handleSearchText} />
        </div>

        <button type="submit">
          <Search />
        </button>
      </form>

      <div className="error-message-container">{searchError}</div>
    </div>
  );
};
