const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const QUERY = `appid=${API_KEY}&units=metric`;

export const getWeatherByLocation = async ({ location }) => {
  try {
    const response = await fetch(`${URL}?${QUERY}&q=${location}`, {
      method: "GET",
    });

    const jsonData = await response.json();

    if (response.ok) {
      return { success: true, message: "", data: jsonData };
    } else {
      return { success: false, message: jsonData.message, data: null };
    }
  } catch (error) {
    return { success: false, message: "request failed", data: null };
  }
};

export const getWeatherByLatLon = async ({ lat, lon }) => {
  try {
    const response = await fetch(`${URL}?${QUERY}&lat=${lat}&lon=${lon}`, {
      method: "GET",
    });

    const jsonData = await response.json();

    if (response.ok) {
      return { success: true, message: "", data: jsonData };
    } else {
      return { success: false, message: jsonData.message, data: null };
    }
  } catch (error) {
    return { success: false, message: "request failed", data: null };
  }
};
