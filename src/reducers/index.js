import { combineReducers } from "redux";

import sessionReducer from "./session";
import userReducer from "./user";
import messageReducer from "./message";
import variableReducer from "./variables";
import dataReducer from "./data";
import logicReducer from './logic';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  messageState: messageReducer,
  variableState: variableReducer,
  dataState: dataReducer,
  logicState: logicReducer
});

export default rootReducer;
