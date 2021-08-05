import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";

function UserInfo() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  function logoutHandler() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className="bgc-base-100 py-2 mb-2 pb-2 bdrs-2">
      <h3 className="fsz-2">Your Profile</h3>
      <div className="flex-layout m-4 jc-space-between ai-center">
        <div className="d-flex ai-center mb-2">
          <div className="fsz-5 c-primary">
            <FaUserCircle />
          </div>
          <h4 className="fsz-1 m-3">
            Name : <span className="fw-400">{user}</span>
          </h4>
        </div>
        <button
          className="btn-primary d-flex jc-center"
          onClick={() => logoutHandler()}
        >
          <FiLogOut className="fsz-1 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}
export { UserInfo };
