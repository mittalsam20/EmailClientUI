import { combineReducers } from "redux";
import emailReducer from "./Email/EmailReducer";

const rootReducer = combineReducers({
  email: emailReducer,
});

export default rootReducer;
