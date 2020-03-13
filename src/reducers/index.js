import { combineReducers } from "redux";

import sessionReducer from "./session";
import userReducer from "./user";
import messageReducer from "./message";
import variableReducer from "./variables";
import dataReducer from "./data";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  messageState: messageReducer,
  variableState: variableReducer,
  dataState: dataReducer,
});

export default rootReducer;
