import React from "react";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../assets/photo1.png";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router";

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
      <div className="d-flex m-4">
        <div className="avatar-lg">
          <img src={userImage} alt="avatar" />
        </div>
        <h4 className="fsz-1 m-3">
          Name : <span className="fw-400">{user}</span>
        </h4>
      </div>
      <button
        className="btn-primary mx-4 mb-4 d-flex jc-center"
        onClick={() => logoutHandler()}
      >
        <FiLogOut className="fsz-1 mr-2" />
        Logout
      </button>
    </div>
  );
}
export { UserInfo };
