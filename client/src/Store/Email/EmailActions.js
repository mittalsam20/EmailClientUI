import { UPDATE_EMAIL_FILTERS } from "./EmailTypes";

export const updateEmailFilters = ({ name, value }) => {
  return {
    type: UPDATE_EMAIL_FILTERS,
    payload: { [name]: value },
  };
};
