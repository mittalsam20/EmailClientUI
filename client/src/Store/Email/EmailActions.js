import {
  ADD_TO_READ,
  RESET_EMAIL_FILTERS,
  UPDATE_EMAIL_FILTERS,
  RESET_SELECTED_EMAIL,
  UPDATE_SELECTED_EMAIL,
  UPDATE_FAVORITE_EMAILS,
} from "./EmailTypes";
import {
  READ_EMAILS_LOCAL_STORAGE_KEY,
  FAVORITE_EMAILS_LOCAL_STORAGE_KEY,
} from "Constants/Constants";
import { setItemsInLocalStorage } from "Utils/helperFunctions";

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

const getUpdatedFavoriteEmailIds = ({ action, emailId, previousValue }) => {
  switch (action) {
    case "ADD": {
      return [...previousValue, emailId];
    }
    case "REMOVE": {
      return previousValue.filter((id) => id !== emailId);
    }
    default: {
      return previousValue;
    }
  }
};

export const updateFavoriteEmailIds = ({ action = "ADD", emailId }) => {
  return async (dispatch, getState) => {
    try {
      const previousValue = getState().email.favoriteEmailIds || [];
      const updatedFavoriteEmailIds = getUpdatedFavoriteEmailIds({
        action,
        emailId,
        previousValue,
      });
      setItemsInLocalStorage({
        key: FAVORITE_EMAILS_LOCAL_STORAGE_KEY,
        value: updatedFavoriteEmailIds,
      });
      dispatch({
        type: UPDATE_FAVORITE_EMAILS,
        payload: updatedFavoriteEmailIds,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addEmailToRead = ({ emailId }) => {
  return async (dispatch, getState) => {
    try {
      const previousValue = getState().email.readEmailIds || [];
      const updatedReadEmailIds = [...previousValue, emailId];
      setItemsInLocalStorage({
        key: READ_EMAILS_LOCAL_STORAGE_KEY,
        value: updatedReadEmailIds,
      });
      dispatch({
        type: ADD_TO_READ,
        payload: updatedReadEmailIds,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
