import { ADMIN_LOADED, ADMIN_LOGIN, ADMIN_LOGOUT, WRONG_CREDENTIALS } from './constants';

const initialState = {
  token: localStorage.getItem('accessToken'),
  isAuthenticate: false,
  admin: [],
  wronCredentials: true
};

export default function adminAuth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticate: true,
        admin: payload
      };

    case ADMIN_LOGIN:
      return {
        ...state,
        isAuthenticate: true,
        admin: payload,
        token: payload.token
      };

    case WRONG_CREDENTIALS:
      return {
        ...state,
        wronCredentials: payload.success
      };

    case ADMIN_LOGOUT:
      return {
        ...state,
        isAuthenticate: false,
        token: null
      };
    default:
      return state;
  }
}
