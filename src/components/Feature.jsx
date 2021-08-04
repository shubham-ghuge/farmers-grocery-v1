import React from "react";

function Feature({ details, icon }) {
  return (
    <div className="feature">
      <span className="avatar-sm-i-primary">
        <span className="icon">{icon}</span>
      </span>
      <p className="muted">{details.heading}</p>
      <p>{details.text}</p>
    </div>
  );
}
export { Feature };
