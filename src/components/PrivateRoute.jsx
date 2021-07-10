import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router";

function PrivateRoute({ path, ...props }) {
  const { userLoginStatus } = useSelector((state) => state.auth);
  return userLoginStatus ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate replace to="/auth" />
  );
}
export { PrivateRoute };
