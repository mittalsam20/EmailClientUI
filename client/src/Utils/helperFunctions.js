const formattedDateOptions = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
};

const formattedTimeOptions = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export const getFormattedDateFromTimestamp = ({ timestamp }) => {
  const dateObject = new Date(timestamp);
  const formattedDate = dateObject.toLocaleDateString([], formattedDateOptions);
  const formattedTime = dateObject
    .toLocaleTimeString([], formattedTimeOptions)
    .split(" ")
    .join("")
    .toLowerCase();

  return `${formattedDate} ${formattedTime}`;
};

export const getInitialsFromFirstName = ({ name = "" }) => {
  return name[0];
};

export const capitalizeFirstLetter = ({ string }) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const setItemsInLocalStorage = ({ key, value }) => {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
};

export const getItemsFromLocalStorage = ({ key }) => {
  const stringifiedValue = localStorage.getItem(key);
  return JSON.parse(stringifiedValue);
};
