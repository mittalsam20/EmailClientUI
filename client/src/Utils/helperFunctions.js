export const getInitialsFromFirstName = ({ name = "" }) => {
  return name[0];
};

export const capitalizeFirstLetter = ({ string }) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
