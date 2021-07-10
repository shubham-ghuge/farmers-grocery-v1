import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../features/authSlice";

function Register() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    confirmPassword: "",
    password: "",
  });
  const { loading, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function registerFormHandler(e) {
    e.preventDefault();
    dispatch(
      registerUser({
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
      })
    );
  }

  return (
    <div className="flex-column h-70 jc-center ai-center">
      {message && <h3>{message}</h3>}
      <form
        className="flex-column my-4 ai-center"
        onSubmit={(e) => registerFormHandler(e)}
      >
        <input
          className="mb-4"
          type="text"
          placeholder="john doe"
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails((curr) => ({ ...curr, name: e.target.value }))
          }
        />
        <input
          className="mb-4"
          type="email"
          placeholder="john@farmersgrocery.com"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails((curr) => ({ ...curr, email: e.target.value }))
          }
        />
        <input
          className="mb-4"
          type="password"
          placeholder="Enter Password"
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails((curr) => ({ ...curr, password: e.target.value }))
          }
        />
        <input
          className="mb-4"
          type="password"
          placeholder="Enter confirm Password"
          value={userDetails.confirmPassword}
          onChange={(e) =>
            setUserDetails((curr) => ({
              ...curr,
              confirmPassword: e.target.value,
            }))
          }
        />
        <button className="btn-primary">
          {loading ? "signing in..." : "register"}
        </button>
      </form>
      <p>
        already have an account?<Link to="/auth">Login</Link>
      </p>
    </div>
  );
}
export { Register };
