import api from "../../utils/api";
import { setSession } from "../../utils/jwt";

export const loadAdmin = () => async (dispatch) => {
  try {
    // const response = api.get('/api/auth/login');
    const response = await api.get("/auth/me");

    dispatch({
      type: "ADMIN_LOADED",
      payload: response.data.admin,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    console.log("datas", data);
    const response = await api.post("/auth/login", data);
    const { admin, message, success, user } = response.data;

    console.log("login user data", response.data);

    if (success) {
      const { token } = response.data;
      setSession(token);

      dispatch({
        type: "USER",
        payload: user,
      });

      dispatch({
        type: "ADMIN_LOGIN",
        payload: response.data,
      });
      dispatch({
        type: "WRONG_CREDENTIALS",
        payload: response.data,
      });
      dispatch(loadAdmin());
    } else {
      console.log("all data", response.data);
      dispatch({
        type: "WRONG_CREDENTIALS",
        payload: response.data,
      });
    }
    return response;
  } catch (error) {
    // const errors = error.response.data.error;
  }
};

export const logout = () => (dispatch) => {
  setSession(null);
  dispatch({
    type: "ADMIN_LOGOUT",
  });
};

// export const adminLogin = (data) => async (dispatch) => {
//   const response = await api.post('/api/auth/login', data);
//   const { admin, message, success } = response.data;

//   if (success) {
//     const { token } = response.data;
//     dispatch({
//       type: 'ADMIN_LOGIN',
//       payload: response.data
//     });
//   }
// };
