import React from "react";
import { FcShop } from "react-icons/fc";
import { Link } from "react-router-dom";
export const NotFound = () => {
  return (
    <div className="flex-column h-70 ai-center jc-center">
      <span style={{ fontSize: "15rem", lineHeight: "0" }}>
        <FcShop />
      </span>
      <h1 className="text-center">Page Not Found</h1>
      <Link to="/">Return to Home</Link>
    </div>
  );
};
