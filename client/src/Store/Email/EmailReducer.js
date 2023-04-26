import { UPDATE_EMAIL_FILTERS } from "./EmailTypes.js";

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
    default:
      return state;
  }
};

export default reducer;
