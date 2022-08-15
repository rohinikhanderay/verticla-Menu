import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  GOOGLE_AUTH_DATA,
  GOOGLE_AUTH_DATA_CLEAR,
  AUTH_ADMIN
} from "./types";
const initialState = {
  googleAuthData: {},
   authenticated: false,
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: "",
        authenticated: true,
      };
        case AUTH_ADMIN:
      return {
        ...state,
        error: "",
        authenticated: true,
      };
    case GOOGLE_AUTH_DATA:
      return {
        ...state,
        error: "",
        googleAuthData: action.payload,
        authenticated: true,
      };
    case GOOGLE_AUTH_DATA_CLEAR:
      return {
        ...state,
        error: "",
        googleAuthData: {},
        authenticated: false,
      };
    case UNAUTH_USER:
      return { ...state, error: "", authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: "" };
    default:
      return state;
  }
}
