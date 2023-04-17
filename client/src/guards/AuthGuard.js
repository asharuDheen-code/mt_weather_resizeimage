import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
// import Login from "../pages/Login";
// import IsAuth from "../contexts/isAuth";
import api from "../utils/api";
import { setSession } from "../utils/jwt";
import SignIn from "../pages/signIn/SignIn";
// import { isAuthenticates } from '../modules/admin/reducer';

AuthGuard.prototype = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const dispatch = useDispatch();
  // IsAuth();
  // const { isAuthenticated } = IsAuth();
  const [requestedLocation, setRequestedLocation] = useState(null);
  const { isAuthenticate } = useSelector((state) => state.adminAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    const initialize = async () => {
      const accessToken = window.localStorage.getItem("accessToken");
      // if (accessToken && isValidToken(accessToken)) {
      setSession(accessToken);
      if (accessToken) {
        const response = await api.get("/auth/me");
        // const { admin } = response.data;

        dispatch({
          type: "ADMIN_LOADED",
          payload: response.data.admin,
        });
      }
    };
    initialize();
  }, []);

  console.log("is auth check", isAuthenticate);

  if (!isAuthenticate) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <SignIn />;
  }
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
