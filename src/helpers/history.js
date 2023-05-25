import moment from "moment";

const LOCAL_KEY = "history";

export const formatHistoryRecord = (data) => {
  const roundUp = (n) => Math.round(n);

  return {
    weather: data.weather[0].main,
    temp: roundUp(data.main.temp),
    temp_max: roundUp(data.main.temp_max),
    temp_min: roundUp(data.main.temp_min),
    humidity: data.main.humidity,
    name: data.name,
    country: data.sys.country,
    datetime: moment.unix(data.dt).format("DD-MM-YYYY hh:mma"),
  };
};

export const getHistoryRecord = () => {
  return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
};

export const updateHistoryRecord = (newData) => {
  const history = JSON.parse(localStorage.getItem(LOCAL_KEY));

  let temp = [];
  let isExisted = false;

  history?.forEach((x) => {
    let record = x;

    if (x.name === newData.name && x.country === newData.country) {
      record = newData;
      isExisted = true;
    }

    temp.push(record);
  });

  let newHistory = [...temp];

  if (!isExisted) newHistory.push(newData);

  localStorage.setItem(LOCAL_KEY, JSON.stringify(newHistory));

  return newHistory;
};

export const removeHistoryRecord = (location) => {
  const history = JSON.parse(localStorage.getItem(LOCAL_KEY));

  let newHistory = history.filter((each) => each.name !== location);

  localStorage.setItem(LOCAL_KEY, JSON.stringify(newHistory));

  return newHistory;
};
