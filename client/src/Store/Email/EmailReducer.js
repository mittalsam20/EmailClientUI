import { UPDATE_EMAIL_FILTERS } from "./EmailTypes.js";
  RESET_EMAIL_FILTERS,
  UPDATE_EMAIL_FILTERS,
  RESET_SELECTED_EMAIL,
  UPDATE_SELECTED_EMAIL,

const initialEmailFilters = {
  page: 1,
  status: "UNREAD",
};

const initialState = {
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
    default:
      return state;
  }
};

export default reducer;
