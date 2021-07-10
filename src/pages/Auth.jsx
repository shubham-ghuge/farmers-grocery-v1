import React from "react";
import { Outlet } from "react-router";

function Auth() {
  return (
    <div className="nav-adjust p-7">
      <Outlet />
    </div>
  );
}
export { Auth };
