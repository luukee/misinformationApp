import { combineReducers } from "redux";

import Auth from "./auth.reducers";
import Theme from "./theme.reducers";

export default combineReducers({
  Auth: Auth,
  Theme: Theme,
});
