import { useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//
import api from "../utils/api";

// hooks
// import useAuth from '../hooks/useAuth';
// routes
// import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

LoginGuard.propTypes = {
  children: PropTypes.node,
};

export default function LoginGuard({ children }) {
  const { isAuthenticate } = useSelector((state) => state.adminAuth);

  const dispatch = useDispatch();
  useEffect(() => {
    const initialize = async () => {
      const accessToken = window.localStorage.getItem("accessToken");
      // if (accessToken && isValidToken(accessToken)) {
      if (accessToken) {
        const response = await api.get('/api/auth/me');
        // const { admin } = response.data;

        dispatch({
          type: "ADMIN_LOADED",
          payload: response.data.admin,
        });
      }
    };
    initialize();
  }, []);
    // const { isAuthenticated } = useAuth();

    console.log("check is auth", isAuthenticate)

  if (isAuthenticate) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
