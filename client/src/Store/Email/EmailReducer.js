import {
  ADD_TO_READ,
  RESET_EMAIL_FILTERS,
  UPDATE_EMAIL_FILTERS,
  RESET_SELECTED_EMAIL,
  UPDATE_SELECTED_EMAIL,
  UPDATE_FAVORITE_EMAILS,
} from "./EmailTypes.js";
import {
  READ_EMAILS_LOCAL_STORAGE_KEY,
  FAVORITE_EMAILS_LOCAL_STORAGE_KEY,
} from "Constants/Constants.js";
import { getItemsFromLocalStorage } from "Utils/helperFunctions.js";

const initialEmailFilters = {
  page: 1,
  status: "UNREAD",
};

const initialReadEmailIds =
  getItemsFromLocalStorage({ key: READ_EMAILS_LOCAL_STORAGE_KEY }) || [];
const initialFavoriteEmailIds =
  getItemsFromLocalStorage({ key: FAVORITE_EMAILS_LOCAL_STORAGE_KEY }) || [];

const initialState = {
  readEmailIds: initialReadEmailIds,
  favoriteEmailIds: initialFavoriteEmailIds,
  selectedEmail: null,
  emailFilters: initialEmailFilters,
};

const updateState = ({ state, entityName, value }) => {
  return { ...state, [entityName]: value };
};

const reducer = (state = initialState, action) => {
  const { type, payload = "" } = action;
  switch (type) {
    case UPDATE_EMAIL_FILTERS: {
      return updateState({
        state,
        entityName: "emailFilters",
        value: { ...state.emailFilters, ...payload },
      });
    }
    case RESET_EMAIL_FILTERS: {
      return updateState({
        state,
        entityName: "emailFilters",
        value: initialEmailFilters,
      });
    }
    case UPDATE_SELECTED_EMAIL: {
      return updateState({
        state,
        entityName: "selectedEmail",
        value: payload,
      });
    }
    case RESET_SELECTED_EMAIL: {
      return updateState({
        state,
        entityName: "selectedEmail",
        value: null,
      });
    }
    case UPDATE_FAVORITE_EMAILS: {
      return updateState({
        state,
        entityName: "favoriteEmailIds",
        value: payload,
      });
    }
    case ADD_TO_READ: {
      return updateState({
        state,
        entityName: "readEmailIds",
        value: payload,
      });
    }
    default:
      return state;
  }
};

export default reducer;
