import { authConstants } from "../constants/auth.constants";

const initialState = {
  isLoggedIn: true,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.SET_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default Auth;
