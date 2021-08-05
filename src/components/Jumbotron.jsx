import React from "react";
import { Link } from "react-router-dom";
export const Jumbotron = ({ text, onlyText }) => {
  return (
    <div className="jumbotron bgc-success-100">
      <div className="content">
        {onlyText ? (
          <>
            <h3 className="jumbotron-title">{onlyText}</h3>
            <p className="jumbotron-description">
              please visit again
            </p>
          </>
        ) : (
          <>
            <h3 className="jumbotron-title">
              Your {text} is lighter than a feather
            </h3>
            <p className="jumbotron-description">
              Continue shopping to add items to your {text} . Here are some
              offers to get you started
            </p>
            <Link
              to="/store"
              className="jumbotron-cta btn-outline-success bgc-base-100"
            >
              go shopping
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
