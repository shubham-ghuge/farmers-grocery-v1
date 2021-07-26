import React, { useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";

function Alert({ onClose, message, color = "danger" }) {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 2000);
  }, []);

  color = (message.includes("success") && "success") || color;

  return (
    <div className="alert d-flex jc-center">
      <div className={`alert-${color} w-sm-30 w-80 outline-${color}`}>
        <div className="alert-content">
          <p> {message}</p>
        </div>
        <span className="close">
          <button
            onClick={() => onClose()}
            className={`btn-reset fsz-2 icon w-auto c-${color}`}
          >
            <IoCloseCircle />
          </button>
        </span>
      </div>
    </div>
  );
}
export { Alert };
