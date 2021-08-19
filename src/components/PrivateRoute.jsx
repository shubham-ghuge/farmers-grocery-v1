import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router";

function PrivateRoute({ path, ...props }) {
  const { userLoginStatus } = useSelector((state) => state.auth);
  const state = useLocation();
  return userLoginStatus ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate replace to="/auth" state={{ from: state.pathname }} />
  );
}
export { PrivateRoute };
