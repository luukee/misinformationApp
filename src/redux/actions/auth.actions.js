import { authConstants } from "../constants/auth.constants";

export const setFCMToken = (isLoggedIn) => ({
  type: authConstants.SET_LOGIN,
  payload: isLoggedIn,
});
