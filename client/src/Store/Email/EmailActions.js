import { UPDATE_EMAIL_FILTERS } from "./EmailTypes";
  RESET_EMAIL_FILTERS,
  UPDATE_EMAIL_FILTERS,
  RESET_SELECTED_EMAIL,
  UPDATE_SELECTED_EMAIL,

export const updateEmailFilters = ({ name, value }) => {
  return {
    type: UPDATE_EMAIL_FILTERS,
    payload: { [name]: value },
  };
};

//can be used if we want to resetFilters on unMounting of component
export const resetEmailFilters = () => {
  return {
    type: RESET_EMAIL_FILTERS,
  };
};

export const updateSelectedEmail = ({ email }) => {
  return {
    type: UPDATE_SELECTED_EMAIL,
    payload: email,
  };
};

export const resetSelectedEmail = () => {
  return {
    type: RESET_SELECTED_EMAIL,
  };
};
