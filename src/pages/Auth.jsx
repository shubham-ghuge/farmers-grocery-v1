import React from "react";
import { Outlet } from "react-router";

function Auth() {
  return (
    <div className="d-flex jc-center ai-center auth-container">
      <Outlet />
    </div>
  );
}
export { Auth };
