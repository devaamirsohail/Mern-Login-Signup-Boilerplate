import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import flashMessagesReducer from "./flashMessageReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  flash: flashMessagesReducer
});
